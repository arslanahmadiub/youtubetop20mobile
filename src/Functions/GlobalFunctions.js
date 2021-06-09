import { getAdvanceSearchResult } from "../Services/GlobalServices";

export async function globalSearch(
  customDate,
  listOfSelectedRegions,
  tagsInput
) {
  try {
    let { data } = await getAdvanceSearchResult(
      customDate,
      listOfSelectedRegions,
      tagsInput
    );

    return data;
  } catch (error) {
    return error;
  }
}
