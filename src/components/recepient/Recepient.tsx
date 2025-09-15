"use client";
import React, { useEffect, useState } from "react";
import { Pencil, EyeIcon, DocsIcon, PencilIcon } from "@/icons/index";
import { apiUrl } from "@/utils/config";
import TextHeading from "../ui/textheader/TextHeader";
import { TableBody, TableCell, TableHeader, TableRow, Table } from "../ui/table";

function Recepient() {
  const [token, setToken] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [recepientList, setRecepientList] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<number | string | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [kekyword, setKekyword] = useState("");
  const [author, setAuthor] = useState("");
  const [collection, setCollection] = useState("");
  const [ownerName, setOwnerName] = useState("");

  const fetchRecepientList = async (jwt: string, vendoruuid: string) => {
    const res = await fetch(
      `${apiUrl}/api/recepientlists?filters[vendoruuid][$eq]=${vendoruuid}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    const data = await res.json();
    const recepients = data.data.map((item: any) => ({
      id: item.id,
      user: {
        name: item.attributes.name,
        collection: item.attributes.collection,
        kekyword: item.attributes.kekyword,
        author: item.attributes.author,
      },
    }));
    setRecepientList(recepients || []);
  };

  useEffect(() => {
    const fetchData = async () => {
      const jwt = localStorage.getItem("jwt");
      const staffDataString = localStorage.getItem("staffData");
      const staffData = staffDataString ? JSON.parse(staffDataString) : null;
      const vendoruuid = staffData?.data?.[0]?.attributes?.vendoruuid;
      const ownerName = staffData?.data?.[0]?.attributes?.ownerName;
      setOwnerName(ownerName);

      if (jwt && vendoruuid) {
        setToken(jwt);
        setVendorId(vendoruuid);
        try {
          await fetchRecepientList(jwt, vendoruuid);
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
    setAuthor(ownerName);
    setCollection("");
    setEditId(null);
    setIsEditing(false);
    setIsEditable(false);
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
      let res;
      if (isEditing && editId) {
        res = await fetch(`${apiUrl}/api/recepientlists/${editId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      } else {
        res = await fetch(`${apiUrl}/api/recepientlists`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        });
      }

      await res.json();
      setShowModal(false);
      resetForm();
      await fetchRecepientList(token, vendorId);
    } catch (err) {
      console.error("Error saving data:", err);
    }
  };

  const handleEdit = (item: any) => {
    setName(item.user.name);
    setKekyword(item.user.kekyword);
    setAuthor(item.user.author);
    setCollection(item.user.collection);
    setEditId(item.id);
    setIsEditing(true);
    setIsEditable(false);
    setShowModal(true);
  };

  return (
    <div className="">
      <div className="border-b bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 px-6 py-5 shadow-sm">
        <TextHeading
          title="All Recepients"
          icon="👥"
          buttonprops={{
            buttonText: '+',
            title: 'Add Recepients',
            content: 'Here you can enroll Recepients in the system.',
            onClick: () => {
              resetForm();
              setIsEditable(true);
              setShowModal(true);
            }
          }}
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[1102px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Name</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">kekyword</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Author</TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">Edit</TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {recepientList.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="px-5 py-6 sm:px-6 text-start">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 overflow-hidden rounded-lg">
                          <img src={`https://ui-avatars.com/api/?name=${order.user.name}&background=random`} alt={order.user.name} />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                            {order.user.name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.user.kekyword}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {order.user.author}
                    </TableCell>
                    <TableCell>
                      <button onClick={() => handleEdit(order)} className="ps-6 flex justify-end text-gray-500 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                      >
                        <PencilIcon />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-10 flex items-center justify-center z-50">
          <div className="bg-[#ffffff] p-6 rounded-2xl shadow w-[90%] h-screen overflow-y-auto">
            <div className="flex flex-col items-center justify-center min-h-[300px] bg-[#DDE6FA] px-4 rounded-3xl">
              <div className="bg-gradient-to-r from-[#506edb] to-[#2042BD] text-white rounded-3xl px-8 py-10 w-full max-w-3xl text-center shadow-xl relative">
                <h2 className="text-2xl font-semibold mb-2">
                  {isEditing ? "Edit Recepient Information" : "Add Recepient Information"}
                </h2>
                <p className="text-sm text-blue-100 mb-6">
                  {isEditing ? "Update Recepient Details to keep your Profile Accurate" : "Add Recepient Details to keep your Profile Accurate"}
                </p>
              </div>
            </div>

            {/* buttn */}
            <div className="flex justify-end mt-6 items-center">
              {isEditing && !isEditable ? (
                <button
                  onClick={() => setIsEditable(true)}
                  className="flex justify-center items-center w-20 px-4 py-2 bg-[#2143BE] text-white hover:bg-[#4E6CDA] rounded-2xl text-center"
                >
                  <Pencil />
                </button>
              ) : (
                isEditing && (
                  <button
                    onClick={() => {
                      handleSubmit();
                      setIsEditable(false);
                    }}
                    className="flex  justify-center items-center w-20 px-4 py-2 bg-[#4E6CDA] text-white hover:bg-[#2143BE] rounded-2xl text-center"
                  >
                    <DocsIcon />
                  </button>
                )
              )}
            </div>

            <div className="bg-[#DDE6FA] p-10 rounded-3xl mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">Name</h3>
                  <input
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={!isEditable}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">Keyword</h3>
                  <input
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                    placeholder="Keyword"
                    value={kekyword}
                    onChange={(e) => setKekyword(e.target.value)}
                    disabled={!isEditable}
                  />
                </div>
                <div>
                  <h3 className="text-gray-700 text-base font-bold pb-2">Author</h3>
                  <input
                    className={`w-full border-2 ${!isEditable ? "bg-gray-100" : "bg-white"} rounded-xl p-2 mb-3`}
                    placeholder={author}
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    disabled={!isEditable}
                    readOnly
                  />
                </div>
              </div>
            </div>

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
                onClick={() => {
                  handleSubmit();
                  setIsEditable(false);
                }}
              >
                {isEditing ? "Save" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Recepient;