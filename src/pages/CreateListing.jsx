import { type } from "@testing-library/user-event/dist/type";
import React, { useState } from "react";

export default function CreateListing() {
  const [formData, setFormData] = useState({
    type: "rent",
    name: "",
    bedrooms: 1,
    bathrooms: 1,
    parking: false,
    furnish: false,
    address: "",
    description: "",
    offer: false,
    regularPrice: 0,
  });

  const {
    type,
    name,
    bedrooms,
    bathrooms,
    parking,
    furnish,
    address,
    description,
    offer,
    regularPrice,
  } = formData;
  function onChangeHandler() {}

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form>
        <p className="text-lg mt-6 font-semibold ">Sell / Rent</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "rent"
                ? "bg-white text-black "
                : "bg-slate-600 text-white "
            } `}
            type="button"
            id="type"
            value="sale"
            onClick={onChangeHandler}
          >
            Sell
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              type === "sale"
                ? "bg-white text-black "
                : "bg-slate-600 text-white "
            } `}
            type="button"
            id="type"
            value="sale"
            onClick={onChangeHandler}
          >
            Rent
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold ">Name</p>
        <input
          type="text"
          id="name"
          value={name}
          onChange={onChangeHandler}
          placeholder="Property Name"
          maxLength="32"
          minLength="10"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 "
        />
        <div className="flex space-x-6 mb-6">
          <div>
            <p className="text-lg font-semibold">Beds</p>
            <input
              type="number"
              id="bedrooms"
              value={bedrooms}
              onChange={onChangeHandler}
              min="1"
              max="50"
              required
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center rounded"
            />
          </div>
          <div>
            <p className="text-lg font-semibold">Baths</p>
            <input
              type="number"
              id="bedrooms"
              value={bathrooms}
              onChange={onChangeHandler}
              min="1"
              max="50"
              required
              className="px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center rounded"
            />
          </div>
        </div>
        <p className="text-lg mt-6 font-semibold ">Parking spot</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !parking ? "bg-white text-black " : "bg-slate-600 text-white "
            } `}
            type="button"
            id="parking"
            value={true}
            onClick={onChangeHandler}
          >
            Yes
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              parking ? "bg-white text-black " : "bg-slate-600 text-white "
            } `}
            type="button"
            id="parking"
            value={false}
            onClick={onChangeHandler}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold ">Furnished</p>
        <div className="flex">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !furnish ? "bg-white text-black " : "bg-slate-600 text-white "
            } `}
            type="button"
            id="furnish"
            value={true}
            onClick={onChangeHandler}
          >
            Yes
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              furnish ? "bg-white text-black " : "bg-slate-600 text-white "
            } `}
            type="button"
            id="furnish"
            value={false}
            onClick={onChangeHandler}
          >
            No
          </button>
        </div>
        <p className="text-lg mt-6 font-semibold ">Address</p>
        <textarea
          type="text"
          id="address"
          value={address}
          onChange={onChangeHandler}
          placeholder="Address"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 "
        />
        <p className="text-lg font-semibold ">Description</p>
        <textarea
          type="text"
          id="description"
          value={description}
          onChange={onChangeHandler}
          placeholder="Description"
          required
          className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 mb-6 "
        />
        <p className="text-lg mt-6 font-semibold ">Offers</p>
        <div className="flex mb-6">
          <button
            className={`mr-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              offer ? "bg-white text-black " : "bg-slate-600 text-white "
            } `}
            type="button"
            id="offer"
            value={true}
            onClick={onChangeHandler}
          >
            Yes
          </button>
          <button
            className={`ml-3 px-7 py-3 font-medium text-sm uppercase shadow-md rounded hover:shadow-lg focus:shadow-lg active:shadow-lg transition duration-150 ease-in-out w-full ${
              !offer ? "bg-white text-black " : "bg-slate-600 text-white "
            } `}
            type="button"
            id="offer"
            value={false}
            onClick={onChangeHandler}
          >
            No
          </button>
        </div>
        <div className="flex items-center mb-6">
          <div>
            <p className="text-lg font-semibold">Regular Price</p>
            <div className="flex w-full justify-center items-center space-x-6">
              <input
                type="number"
                id="regularPrice"
                value={regularPrice}
                onChange={onChangeHandler}
                min="50"
                max="400000000"
                required
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
              />
              {type === "rent" && (
                <div className="">
                  <p className="text-md w-full whitespace-nowrap">$ / Month</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
