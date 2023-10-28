import { useAppSelector } from "@/redux/store/hook"

export const useBoardNames = () => {
    const boardsData = useAppSelector(state => state.boardsSlice);
    const boardNames = boardsData.boards?.map((board) => board.name);
    const { loading } = boardsData;

    return ({boardNames, loading});
}