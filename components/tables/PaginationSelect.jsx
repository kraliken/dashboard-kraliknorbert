'use client'

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import { limits } from '@/lib/constants'

const PaginationSelect = ({ selectedValue, onChange }) => {

    return (
        <Select value={selectedValue} onValueChange={onChange}>
            <SelectTrigger className="w-[80px]">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                {limits.map((val) => (
                    <SelectItem key={val} value={val}>
                        {val}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export default PaginationSelect