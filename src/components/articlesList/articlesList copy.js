// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { Pagination } from "antd";
// import {
//   setPage,
//   recieveArticles,
//   setLoadingArticles,
//   setError,
// } from "../../actions";
// import Article from "../article";
// import Loading from "../loading";
// import Error from "../error";
// import { getArticlesList } from "../../services/api";

// import cls from "./articlesList.module.scss";
// import "./antPagination.scss";

// const ArticlesList = () => {
//   const dispatch = useDispatch();

//   const isError = useSelector((state) => state.error);
//   const isLoading = useSelector((state) => state.loading.articles);
//   const storeArticles = useSelector((state) => state.articles);
//   const page = useSelector((state) => state.page);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const { articles } = await getArticlesList(5, page);

//         dispatch(recieveArticles(articles));
//         dispatch(setLoadingArticles(false));
//       } catch (error) {
//         dispatch(setError(true));
//         dispatch(setLoadingArticles(false));
//       }
//     };

//     fetchData();
//     return () => {
//       dispatch(setLoadingArticles(true));
//     };
//   }, [page, dispatch]);

//   const articlesList = storeArticles.map((article) => {
//     return <Article key={article.createdAt} article={article} isList />;
//   });

//   const onChangePage = (changedPage) => {
//     dispatch(setPage(changedPage));
//   };

//   if (isError) {
//     return <Error />;
//   }
//   if (isLoading) {
//     return <Loading />;
//   }

//   return (
//     <div className={cls.articles_list}>
//       {articlesList}
//       <div className={cls.pagination}>
//         <Pagination
//           current={page}
//           onChange={onChangePage}
//           size="small"
//           total={500}
//           defaultPageSize={5}
//           showSizeChanger={false}
//         />
//       </div>
//     </div>
//   );
// };

// export default ArticlesList;
