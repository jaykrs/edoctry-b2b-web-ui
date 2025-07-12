"use client";
import React, { useEffect, useState } from "react";
import { Pencil, EyeIcon } from "@/icons/index";

function Recepient() {
  const [token, setToken] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [recepientList, setRecepientList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kekyword, setKekyword] = useState("");
  const [author, setAuthor] = useState("");
  const [collection, setCollection] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const jwt = localStorage.getItem("jwt");
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;

      if (jwt && vendoruuid) {
        setToken(jwt);
        setVendorId(vendoruuid);

        try {
          const res = await fetch(
            `https://api.edoctry.com/api/recepientlists?filters[vendoruuid][$eq]=${vendoruuid}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
              },
            }
          );

          const data = await res.json();
          setRecepientList(data.data || []);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("JWT or Vendor ID not found");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add("hide-app-layout");
    } else {
      document.body.classList.remove("hide-app-layout");
    }
    return () => document.body.classList.remove("hide-app-layout");
  }, [showModal]);

  const resetForm = () => {
    setName("");
    setEmail("");
    setKekyword("");
    setAuthor("");
    setCollection("");
    setEditId(null);
    setIsEditing(false);
  };

  const handleSubmit = async () => {
    const payload = {
      data: {
        name,
        email,
        kekyword,
        author,
        collection,
        vendoruuid: vendorId,
      },
    };

    try {
      let res, data;

      if (isEditing && editId) {
        res = await fetch(`https://api.edoctry.com/api/recepientlists/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch("https://api.edoctry.com/api/recepientlists", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      data = await res.json();
      setShowModal(false);
      resetForm();

      const newRes = await fetch(
        `https://api.edoctry.com/api/recepientlists?filters[vendoruuid][$eq]=${vendorId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newData = await newRes.json();
      setRecepientList(newData.data || []);
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  const handleEdit = (item: any) => {
    const rec = item.attributes || item;
    setName(rec.name);
    setEmail(rec.email);
    setKekyword(rec.kekyword);
    setAuthor(rec.author);
    setCollection(rec.collection);
    setEditId(item.id);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-14">
        <h1 className="text-4xl text-gray-700 uppercase pb-2 font-bold ">
          <span className="text-[#2143BE] border-b-4 border-red-500">Recepient</span> Lists
        </h1>
        <button
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
          className="bg-[#2143BE] flex shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300 text-white text-lg px-4 py-2 rounded-full"
        >
          <Pencil />
        </button>
      </div>

      <ul className="mt-6 space-y-4">
        {recepientList.length > 0 ? (
          recepientList.map((item: any, index) => {
            const rec = item.attributes || item;
            return (
              <li
                key={index}
                className="flex justify-between items-center border-b border-[#2143BE] py-5 px-4 shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300 rounded-2xl"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={`https://ui-avatars.com/api/?name=${rec.name}&background=random`}
                    alt={rec.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <h1 className="text-lg font-semibold uppercase ">
                      {rec.name}
                    </h1>
                    <h2 className="text-gray-500">
                      {rec.email || "No Email Provided"}
                    </h2>
                  </div>
                </div>
                <div className="text-sm text-gray-500 text-right">
                  <strong>Updated At:</strong>{" "}
                  {new Date(rec.updatedAt).toLocaleString()}
                </div>
                <button
                  onClick={() => handleEdit(item)}
                  className="bg-[#2143BE] text-white px-3 py-1 rounded-full shadow-[#4E6CDA] hover:shadow-lg transition-shadow duration-300"
                >
                  <EyeIcon />
                </button>
              </li>
            );
          })
        ) : (
          <p>No recipients found.</p>
        )}
      </ul>
      {showModal && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto   ">
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4  rounded-3xl">
              <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                <h2 className="text-2xl font-semibold mb-2">
                  {isEditing ? "Edit Recepient Information" : "Add Recepient Information"}
                </h2>
                <p className="text-sm text-blue-100 mb-6">
                  {isEditing ? "Update Recepient Details to keep your Profile Accurate" : "Add Recepient Details to keep your list organized"}
                </p>

                <div className="flex items-center justify-center max-w-md mx-auto bg-white rounded-full p-1 shadow-md">
                  <input
                    type="email"
                    placeholder="youremail@address.com"
                    className="flex-grow px-4 py-2 rounded-full text-gray-700 outline-none"
                  />
                  <button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full p-2 transition">
                    ➜
                  </button>
                </div>
              </div>
            </div>
            {/* end modal header */}
            <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-700 text-base font-bold  pb-2">Name</h3>
                  <input
                    className="w-full border-2 bg-white rounded-xl p-2 mb-3"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="text-gray-700 text-base font-bold  pb-2">Email</h3>
                  <input
                    className="w-full border-2 bg-white rounded-xl p-2 mb-3"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-700 text-base font-bold  pb-2">Keyword</h3>
                  <input
                    className="w-full border-2 bg-white rounded-xl p-2 mb-3"
                    placeholder="Keyword"
                    value={kekyword}
                    onChange={(e) => setKekyword(e.target.value)}
                  />
                </div>
                <div>
                  <h3 className="text-gray-700 text-base font-bold  pb-2">Author</h3>
                  <input
                    className="w-full border-2 bg-white rounded-xl p-2 mb-3"
                    placeholder="Author"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* <input
        className="border-2 rounded-xl w-full p-2 mb-3 bg-gray-100 text-gray-600"
        placeholder="Vendor UUID"
        value={vendorId}
        readOnly
      /> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#DDE6FA] p-4 rounded-3xl mt-6">
              <button
                className="w-full px-4 py-2 bg-gray-400 hover:bg-red-700 hover:text-white rounded-2xl text-center"
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
              >
                Cancel
              </button>
              <button
                className="w-full px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-2xl text-center"
                onClick={handleSubmit}
              >
                {isEditing ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default Recepient;
