"use client"

import * as React from "react"
import { Combobox as ComboboxPrimitive } from "@base-ui/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group"
import { ChevronDownIcon, XIcon, CheckIcon } from "lucide-react"

const Combobox = ComboboxPrimitive.Root

function ComboboxValue(props) {
  return <ComboboxPrimitive.Value data-slot="combobox-value" {...props} />
}

function ComboboxTrigger({ className, children, ...props }) {
  return (
    <ComboboxPrimitive.Trigger
      data-slot="combobox-trigger"
      className={cn("[&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      {children}
      <ChevronDownIcon className="text-muted-foreground size-4 pointer-events-none" />
    </ComboboxPrimitive.Trigger>
  )
}

function ComboboxClear({ className, ...props }) {
  return (
    <ComboboxPrimitive.Clear
      data-slot="combobox-clear"
      className={cn(className)}
      {...props}
      render={
        <InputGroupButton variant="ghost" size="icon-xs">
          <XIcon className="pointer-events-none" />
        </InputGroupButton>
      }
    />
  )
}

function ComboboxInput({
  className,
  children,
  disabled = false,
  showTrigger = true,
  showClear = false,
  ...props
}) {
  return (
    <InputGroup className={cn("w-full", className)}>
      <ComboboxPrimitive.Input
        render={<InputGroupInput disabled={disabled} />}
        {...props}
      />

      <InputGroupAddon align="inline-end">
        {showTrigger && (
          <InputGroupButton
            size="icon-xs"
            variant="ghost"
            render={<ComboboxTrigger />}
            data-slot="input-group-button"
            className="data-pressed:bg-transparent"
            disabled={disabled}
          />
        )}

        {showClear && <ComboboxClear disabled={disabled} />}
      </InputGroupAddon>

      {children}
    </InputGroup>
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}) {
  return (
    <ComboboxPrimitive.Portal>
      <ComboboxPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        anchor={anchor}
        className="z-50"
      >
        <ComboboxPrimitive.Popup
          data-slot="combobox-content"
          data-chips={!!anchor}
          className={cn(
            `
            bg-white dark:bg-gray-900
            border border-gray-200 dark:border-gray-800
            rounded-lg shadow-lg
            max-h-64 overflow-hidden
            w-[var(--anchor-width)]
            min-w-[var(--anchor-width)]
            `,
            className
          )}
          {...props}
        />
      </ComboboxPrimitive.Positioner>
    </ComboboxPrimitive.Portal>
  )
}


function ComboboxList({ className, ...props }) {
  return (
    <ComboboxPrimitive.List
      data-slot="combobox-list"
      className={cn("max-h-64 overflow-y-auto p-1 w-full", className)}
      {...props}
    />
  )
}

function ComboboxItem({ className, children, ...props }) {
  return (
    <ComboboxPrimitive.Item
      data-slot="combobox-item"
      className={cn(
        "relative flex items-center gap-2 rounded-md px-3 py-2 text-sm cursor-pointer select-none hover:bg-gray-100 dark:hover:bg-gray-800 data-highlighted:bg-accent",
        className
      )}
      {...props}
    >
      {children}

      <ComboboxPrimitive.ItemIndicator
        render={
          <span className="absolute right-3">
            <CheckIcon className="size-4 text-green-500" />
          </span>
        }
      />
    </ComboboxPrimitive.Item>
  )
}

function ComboboxEmpty({ className, ...props }) {
  return (
    <ComboboxPrimitive.Empty
      data-slot="combobox-empty"
      className={cn("text-muted-foreground py-2 text-center text-sm", className)}
      {...props}
    />
  )
}

function useComboboxAnchor() {
  return React.useRef(null)
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxEmpty,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
}
