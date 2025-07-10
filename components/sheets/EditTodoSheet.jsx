'use client'

import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'

export default function EditTodoSheet({ title, triggerLabel = 'Add Todo', isOpen, onOpenChange, children }) {

    const handleClose = () => onOpenChange(false);

    return (
        <Sheet open={isOpen} onOpenChange={onOpenChange}>
            <SheetContent side="right" className="w-full sm:w-[400px]" onOpenAutoFocus={(e) => e.preventDefault()}>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                </SheetHeader>
                <div className="h-full">
                    {children && typeof children === 'object' && children.type
                        ? { ...children, props: { ...children.props, onSuccess: handleClose } }
                        : children
                    }
                </div>
            </SheetContent>
        </Sheet>
    )
}
