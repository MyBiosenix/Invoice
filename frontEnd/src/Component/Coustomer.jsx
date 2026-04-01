import React, { useEffect, useRef, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FileUp, Plus, Search, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";

const STORAGE_KEY = "customers_excel_rows_v1";

const Coustomer = () => {
  const navigate = useNavigate();
  const fileRef = useRef();

  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  // Load saved excel data
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch (e) {
      console.log("localStorage parse error:", e.message);
    }
  }, []);

  // Handle excel upload
  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const workbook = XLSX.read(event.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const json = XLSX.utils.sheet_to_json(sheet);

      let cleaned = json.map((row) =>
        Object.fromEntries(
          Object.entries(row).map(([key, value]) => [
            key.replace(/[^a-zA-Z0-9]/g, ""),
            typeof value === "string" ? value.trim() : value,
          ])
        )
      );

      cleaned = cleaned.filter((row) =>
        Object.values(row).some((v) => v !== null && v !== undefined && v !== "")
      );

      const seen = new Set();
      const uniqueRows = cleaned.filter((row) => {
        const key = `${(row.CandidateName || "").toLowerCase()}-${row.MobileNumber || ""}`;
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      }).reverse();
      console.log(uniqueRows)
      setData(uniqueRows);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueRows));
      e.target.value = "";
    };

    reader.readAsBinaryString(file);
  };

  // Delete all rows

useEffect(()=>{
  console.log(data)
},[])

  const deleteAll = () => {
    if (window.confirm("Are you sure you want to delete all customers?")) {
      setData([]);
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  // Filtered list
  const filteredData = useMemo(() => {
    const q = query.trim().toLowerCase();
    return data.filter(
      (item) =>
        (item.CandidateName || "").toLowerCase().includes(q) &&
        item?.INVOICESTATUS !== "SENT"
    );
  }, [data, query]);

  return (
    <div className="flex flex-col w-full min-h-screen items-center px-2 sm:px-6">
      <div className="w-full sm:w-[30vw] flex flex-col gap-6 sm:gap-4 items-center mt-5">
        <h2 className="inter text-3xl font-extrabold bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 
          bg-clip-text text-transparent drop-shadow-lg relative inline-block after:content-[''] after:block after:h-1 
          after:bg-gradient-to-r after:from-red-500 after:via-pink-500 after:to-purple-500 after:rounded-full 
          after:w-1/2 after:mt-1 after:animate-pulse">
          All Customers
        </h2>

        <input
          ref={fileRef}
          type="file"
          accept=".xlsx,.xls,.csv"
          onChange={handleFile}
          className="hidden"
        />
      </div>

      <Field orientation="horizontal" className={"w-[95%] sm:w-[60vw] mt-2 gap-2"}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          type="search"
          placeholder="Search..."
          className={"rounded-3xl h-12 flex-grow"}
        />
        <Button
          className={"h-10 w-24 sm:w-26 text-base font-bold rounded-xl flex items-center justify-center"}
        >
          <Search />
          <p className="hidden sm:flex ml-1">Search</p>
        </Button>

        <Button
          className="w-24 sm:w-36 h-11 flex items-center justify-center gap-2 text-base font-semibold
          rounded-xl bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-md transition-all duration-300
          hover:scale-[1.04] hover:shadow-lg active:scale-95"
          onClick={() => fileRef.current.click()}
        >
          <FileUp className="w-5  ml-1" />
          <p className=" hidden sm:flex ml-1">Upload</p>
        </Button>

        <Button
          className="w-24  rounded-xl sm:w-36 h-11 flex items-center justify-center gap-2 text-base font-semibold
          bg-red-600 text-white shadow-md transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"
          onClick={deleteAll}
        >
          <Trash2 className="w-5 h-5  ml-1" />
         <p className="hidden sm:flex ml-1">Delete All</p> 
        </Button>
      </Field>

      <div className="w-full overflow-x-scroll mt-10 text-xs">
        <Table className="min-w-[700px] overflow-x-scroll sm:min-w-full border border-gray-300">
          <TableCaption>A list of your recent customers.</TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-200 border-t-2">
              <TableHead className="border p-3 text-center w-[50px]">S.No</TableHead>
              <TableHead className="border p-3">Business Name</TableHead>
              <TableHead className="border p-3">Contact</TableHead>
              <TableHead className="border p-3 hidden sm:table-cell">Email-Id</TableHead>
              <TableHead className="border p-3 text-right hidden sm:table-cell">Address</TableHead>
              <TableHead className="border p-3 text-right">PAID AMOUNT</TableHead>
              <TableHead className="border p-3 text-center">PACKAGE</TableHead>
              <TableHead className="border p-3 text-center">Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredData.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="border p-2 text-center font-semibold">{index + 1}</TableCell>
                <TableCell className="border p-2">{item.CandidateName}</TableCell>
                <TableCell className="border p-2">{item.MobileNumber}</TableCell>
                <TableCell className="border p-2 hidden sm:table-cell">{item.EmailID}</TableCell>
                <TableCell className="border p-2 text-right hidden sm:table-cell">{item.Location}</TableCell>
                <TableCell className="border p-2 text-right">{item.PaidAmount}</TableCell>
                <TableCell className="border p-2 text-center">{item.ProjectSelection}</TableCell>
                <TableCell className="border p-2 text-center">
                  <Button
                    className="h-10 w-28 text-sm font-bold"
                    onClick={() =>
                      navigate("/home/createinvoice", {
                        state: {
                          CandidateName: item.CandidateName,
                          EmailID: item.EmailID,
                          MobileNumber: item.MobileNumber,
                          Location: item.Location,
                          PaidAmount: item.PaidAmount,
                          ProjectSelection: item.ProjectSelection,
                          transectionId:item.TransactionId
                        },
                      })
                    }
                  >
                    Create Invoice
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Coustomer;
