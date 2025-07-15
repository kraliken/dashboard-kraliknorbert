import TodoTableSkeleton from "@/components/tables/TodoTableSkeleton "


const Loading = () => {
    return (
        <div className="flex flex-col gap-4 pb-4">
            <TodoTableSkeleton rows={5} />
        </div>
    )
}

export default Loading