import { Car, Rental } from "@/types";
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";


export const rentApiSlice = createApi({
    reducerPath: "rentApiSlice",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:8080",
    }),
    tagTypes: ["Rentals"],
    endpoints: (builder) => ({
      getRentals: builder.query({
        query: () => `/rental`,
        transformResponse: (result : Rental[]) => result,
        providesTags: ["Rentals"]
        }),
        getRentalsByDate: builder.query({
            query: ({startDate, endDate}) => `/rental/date?startDate=${startDate}&endDate=${endDate}`,
            transformResponse: (result : Car[]) => result,
            providesTags: ["Rentals"]
        }),
        rentCar: builder.mutation({
          query({body}) {
            return {
              url: `/rental`,
              method: 'POST',
              body,
            }
          },
          invalidatesTags: ["Rentals"],
        }),
        getCars: builder.query({
          query: () => "/cars",
          transformResponse: (result : Car[]) => result,
          providesTags: ["Rentals"]
      }),
      putCar: builder.mutation({
          query({body}) {
            return {
              url: `/admin/cars`,
              method: 'PUT',
              body,
              headers: {
                  'Authorization': 'Basic ' + btoa('admin:adminpassword'),
                },
            }
          },
          invalidatesTags: ["Rentals"],
        }),
        deleteRentalsByCar: builder.mutation({
          query({body}) {
            return {
              url: `/admin/rental`,
              method: 'DELETE',
              body,
              headers: {
                  'Authorization': 'Basic ' + btoa('admin:adminpassword'),
                },
            }
          },
          invalidatesTags: ["Rentals"],
        }),
    })
    
})

export const { useGetRentalsQuery, useGetRentalsByDateQuery, useLazyGetRentalsByDateQuery, useRentCarMutation, useGetCarsQuery, usePutCarMutation, useDeleteRentalsByCarMutation } = rentApiSlice;