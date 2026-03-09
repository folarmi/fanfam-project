import EmptyState from "@/components/molecules/EmptyState";
import { Loader } from "@/components/molecules/Loader";
import { useGetData } from "@/hooks/apiCalls";
import { useAppSelector } from "@/lib/hook";
import type { RootState } from "@/lib/store";

const Bookmarks = () => {
  const { userObject } = useAppSelector((state: RootState) => state.auth);

  const { data: getAllBookMarks, isLoading: getAllBookMarksIsLoading } =
    useGetData({
      url: `contents/saves?createdBy=${userObject?.email}&page=0&size=20&sort=desc`,
      queryKey: ["GetBookmarks"],
    });

  return (
    <div>
      {getAllBookMarksIsLoading ? (
        <Loader />
      ) : getAllBookMarks?.length === 0 ? (
        <EmptyState text="No bookmarks yet" />
      ) : (
        getAllBookMarks?.data?.content?.map((item: any) => {
          return (
            <div key={item.usid}>
              <p>{item.fullName}</p>
            </div>
          );
        })
      )}
    </div>
  );
};

export { Bookmarks };
