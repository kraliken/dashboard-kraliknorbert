'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { limits } from '@/lib/constants'

const PaginationSelect = ({ selectedValues, onChange }) => {

    if (!selectedValues) return null;

    return (
        <Select value={selectedValues} onValueChange={onChange}>
            <SelectTrigger className="w-[80px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {limits.map((val) => (
                    <SelectItem key={val} value={val.toString()}>
                        {val}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default PaginationSelect