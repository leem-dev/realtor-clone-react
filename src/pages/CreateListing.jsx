import React, { useState } from "react";
import Spinner from "../component/Spinner";
import { toast } from "react-toastify";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";
import {v4 as uuidv4} from "uuid"

export default function CreateListing() {
  const auth = getAuth()
  const [geolocationEnabled, setGeolocationEnabled] = useState(true);
  const [loading, setLoading] = useState(false);
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
    discountedPrice: 0,
    latitude: 0,
    longitude: 0,
    images: {},
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
    discountedPrice,
    latitude,
    longitude,
    images,
  } = formData;

  function onChangeHandler(e) {
    let boolean = null;

    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }

    // files
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Text/Boolean/Number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  }

  function onSubmitForm(e) {
    e.preventDefault();
    setLoading(true);
    if (discountedPrice >= regularPrice) {
      setLoading(false);
      toast.error("Discounted price needs to be less than regular price");
      return;
    }
    if (images.length > 6) {
      setLoading(false);
      toast.error("maximum 6 images are allowed");
      return;
    }
    let geolocation = {};

    if (geolocationEnabled) {
      geolocation.lat = latitude;
      geolocation.lng = longitude;
    }

    async function storeImage(image) {
      return new Promise((resolve, reject) => {
        const storage = getStorage()
        const filename = `${auth.currentUser.uid}-${image.name}-${uuidv4()}`
        const storageRef = ref(storage, filename);
        const uploadTask = uploadBytesResumable(storageRef, image);

        uploadTask.on('state_changed',
          (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
            }
            }, 
            (error) => {
              // Handle unsuccessful uploads
              reject(error)
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
        );
      })
    }

    const imgUrls = await Promise.all(
      [...images].map((image) => storeImage(image)).catch((error) => {
        setLoading(false)
        toast.error("Images not uploaded")
        return
      })
    )
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <main className="max-w-md px-2 mx-auto">
      <h1 className="text-3xl text-center mt-6 font-bold">Create a Listing</h1>
      <form onSubmit={onSubmitForm}>
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
            value="rent"
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
              id="bathrooms"
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
        {!geolocationEnabled && (
          <div className="flex space-x-6 justify-start mb-6">
            <div className="">
              <p className="text-lg font-semibold ">Latitude</p>
              <input
                type="number"
                id="latitude"
                value={latitude}
                onChange={onChangeHandler}
                required
                min="-90"
                max="90"
                className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center rounded"
              />
            </div>
            <div className="">
              <p className="text-lg font-semibold ">Longitude</p>
              <input
                type="number"
                id="longitude"
                value={longitude}
                onChange={onChangeHandler}
                required
                min="-180"
                max="180"
                className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 transition duration-150 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center rounded"
              />
            </div>
          </div>
        )}
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
              !offer ? "bg-white text-black " : "bg-slate-600 text-white "
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
              offer ? "bg-white text-black " : "bg-slate-600 text-white "
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
        {offer && (
          <div className="flex items-center mb-6">
            <div>
              <p className="text-lg font-semibold">Discounted Price</p>
              <div className="flex w-full justify-center items-center space-x-6">
                <input
                  type="number"
                  id="discountedPrice"
                  value={discountedPrice}
                  onChange={onChangeHandler}
                  min="50"
                  max="400000000"
                  required={true}
                  className="w-full px-4 py-2 text-xl text-gray-700 bg-white border border-gray-300 rounded transition duration-250 ease-in-out focus:text-gray-700 focus:bg-white focus:border-slate-600 text-center"
                />
                {type === "sale" && (
                  <div className="">
                    <p className="text-md w-full whitespace-nowrap">
                      $ / Month
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div className="mb-6 ">
          <p className="text-lg font-semibold ">Images</p>
          <p className="text-gray-600 ">
            The first image will be the cover (max 6)
          </p>
          <input
            type="file"
            id="images"
            onChange={onChangeHandler}
            accept=".jpg,.png,.jpeg"
            multiple
            required
            className="w-full px-3 py-1.5 text-gray-700 bg-white border border-gray-300 rounded transition duration-150 ease-in-out focus:bg-white focus:border-slate-600 "
          />
        </div>
        <button
          type="submit"
          className="mb-6 w-full px-7 py-3 bg-blue-600 text-white font-medium text-sm uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        >
          create listing
        </button>
      </form>
    </main>
  );
}
