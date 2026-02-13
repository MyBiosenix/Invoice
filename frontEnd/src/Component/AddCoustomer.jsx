import React from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, MapPin, Phone, User } from "lucide-react"

const AddCustomer = () => {
  return (
    <div className="w-full max-w-xl mx-auto mt-12 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm">

      {/* Header */}
      <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-800">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Add Customer
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Enter customer details below
        </p>
      </div>

      {/* Form */}
      <div className="p-8 space-y-6">

        {/* Name */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="John Doe"
              className="pl-10 h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Contact Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="+91 98765 43210"
              className="pl-10 h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="email@example.com"
              className="pl-10 h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Address */}
        <div>
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
            Address
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Mumbai, India"
              className="pl-10 h-11 rounded-lg border-gray-300 focus:ring-1 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <Button variant="outline" className="px-5 h-10">
            Cancel
          </Button>
          <Button className="px-6 h-10 font-medium">
            Save Customer
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AddCustomer
