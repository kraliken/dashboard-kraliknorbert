import { Check, PlusCircle } from 'lucide-react'
import React from 'react'
import { Button } from '../ui/button'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Separator } from '../ui/separator'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from '../ui/command'
import { cn } from '@/lib/utils'
import { Badge } from '../ui/badge'

const TodoTableFacetedFilter = ({ title, selectedValues, options, onChange }) => {

    const selectedSet = new Set(selectedValues)

    const toggleValue = (value) => {
        const updated = new Set(selectedSet)
        if (updated.has(value)) {
            updated.delete(value)
        } else {
            updated.add(value)
        }
        onChange([...updated])
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 border-dashed">
                    <PlusCircle />
                    {title}
                    {selectedSet.size > 0 && (
                        <>
                            <Separator orientation="vertical" className="mx-2 h-4" />
                            <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
                                {selectedSet.size}
                            </Badge>
                            <div className="hidden gap-1 lg:flex">
                                {selectedSet.size > 2 ? (
                                    <Badge variant="secondary" className="rounded-sm px-1 font-normal">
                                        {selectedSet.size} selected
                                    </Badge>
                                ) : (
                                    options
                                        .filter((option) => selectedSet.has(option.value))
                                        .map((option) => (
                                            <Badge
                                                key={option.value}
                                                variant="secondary"
                                                className="rounded-sm px-1 font-normal"
                                            >
                                                {option.label}
                                            </Badge>
                                        ))
                                )}
                            </div>
                        </>

                    )}

                </Button>

            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0" align="start">
                <Command>
                    <CommandInput placeholder="Status..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {options.map((option) => {
                                const isSelected = selectedSet.has(option.value)
                                return (
                                    <CommandItem
                                        key={option.value}
                                        onSelect={() => toggleValue(option.value)}
                                    >
                                        <div
                                            className={cn(
                                                "flex size-4 items-center justify-center rounded-[4px] border",
                                                isSelected
                                                    ? "bg-primary border-primary text-primary-foreground"
                                                    : "border-input [&_svg]:invisible"
                                            )}
                                        >
                                            <Check className="text-primary-foreground size-3.5" />
                                        </div>
                                        {option.icon && (
                                            <option.icon className="text-muted-foreground size-4" />
                                        )}
                                        <span>{option.label}</span>
                                    </CommandItem>
                                )
                            })}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}

export default TodoTableFacetedFilter