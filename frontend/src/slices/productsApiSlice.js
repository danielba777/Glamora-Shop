import { PRODUCTS_URL, UPLOADS_URL } from '../constants.js'
import { apiSlice } from './apiSlice.js'

export const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({ keyword = 'search term', pageNumber = 1 } = {}) => ({
              url: PRODUCTS_URL,
              params: { keyword, pageNumber },
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getAllProducts: builder.query({
            query: () => ({
              url: PRODUCTS_URL,
            }),
            keepUnusedDataFor: 5,
            providesTags: ['Products'],
        }),
        getProductDetails: builder.query({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),
        getProductByGender: builder.query({
            query: ({ gender, keyword = '', pageNumber = 1 }) => ({
                url: `${PRODUCTS_URL}/category/${gender}`,
                params: { keyword, pageNumber },
            }),
            keepUnusedDataFor: 5,
        }),
        createProduct: builder.mutation({
            query: () => ({
                url: `${PRODUCTS_URL}`,
                method: 'POST',
            }),
            invalidatesTags: ['Product'],
        }),
        updateProduct: builder.mutation({
            query: (data) => ({
                url: `${PRODUCTS_URL}/${data._id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Product'],
        }),
        uploadProductImage: builder.mutation({
            query: (data) => ({
              url: `/api/upload`,
              method: 'POST',
              body: data,
            }),
        }),
        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `${PRODUCTS_URL}/${productId}`,
                method: 'DELETE',
            })
        }),
    })
})

export const { 
    useGetProductsQuery, 
    useGetAllProductsQuery,
    useGetProductDetailsQuery,
    useGetProductByGenderQuery,
    useCreateProductMutation,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useDeleteProductMutation
} = productsApiSlice