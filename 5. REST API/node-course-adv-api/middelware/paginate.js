// paginator middleware

module.exports = function paginate (sourceList, page, perPage) {
  const totalCount = sourceList.length;
  const lastPage = Math.floor(totalCount / perPage);
  const sliceBegin = page * perPage;
  const sliceEnd = sliceBegin + perPage;
  const pageList = sourceList.slice(sliceBegin, sliceEnd);
  return {
    pageData: pageList,
    nextPage: page < lastPage ? page + 1 : null,
    totalCount: totalCount
  };
};
