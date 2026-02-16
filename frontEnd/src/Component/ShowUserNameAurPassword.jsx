import { Code } from "@/components/code";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBigLeft, ArrowLeft, ShieldCheckIcon } from "lucide-react";

const ShowUserNameAurPassword = () => {
  const { state } = useLocation();
    const navigate=useNavigate()
  return (
    <>
    <div className=" h-8 w-8 shadow-xl rounded-full fixed top-5 left-5 flex items-center justify-center bg-red-200 cursor-pointer">
            <ArrowLeft onClick={()=>{navigate('/home/alluser')}}/>
        </div>
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4">
        
      <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl p-8 flex flex-col gap-6 animate-fadeIn">

        {/* Header */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <ShieldCheckIcon className="h-5 w-5 text-indigo-600" />
          </div>
          <h2 className="text-xl font-semibold text-gray-800">
            Your Login Details
          </h2>
        </div>

        <p className="text-sm text-gray-500">
          Copy and store these credentials safely. You can change them later.
        </p>

        {/* Credentials */}
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              User ID
            </p>
            <Code showCopyButton>
              {state?.userId || "N/A"}
            </Code>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-500 mb-1">
              Password
            </p>
            <Code showCopyButton>
              {state?.password || "N/A"}
            </Code>
          </div>
        </div>

        {/* Footer */}
        <div className="text-xs text-gray-400 text-center pt-2 border-t">
          ⚠️ Don’t share this information with anyone
        </div>

      </div>
    </div>

    </>
  );
};

export default ShowUserNameAurPassword;
