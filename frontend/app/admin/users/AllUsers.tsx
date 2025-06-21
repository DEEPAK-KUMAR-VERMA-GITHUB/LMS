import React, { FC, FormEvent, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { format } from "timeago.js";
import Loader from "@/app/components/Loader/Loader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserRoleMutation,
} from "@/redux/features/user/userApi";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";

type Props = {
  isTeam?: boolean;
};

const AllUsers: FC<Props> = ({ isTeam }) => {
  const [active, setActive] = useState(false);
  const { theme, setTheme } = useTheme();
  const { data, isLoading, refetch } = useGetAllUsersQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
      refetchOnFocus: true,
      refetchOnReconnect: true,
    }
  );

  const [email, setEmail] = useState("");
  const [role, setRole] = useState("admin");
  const [open, setOpen] = useState(false);
  const [userId, setUserId] = useState("");

  const [updateUserRole, { error: updateError, isSuccess }] =
    useUpdateUserRoleMutation();
  const [deleteUser, { isSuccess: deleteSuccess, error: deleteError }] =
    useDeleteUserMutation({});

  useEffect(() => {
    if (updateError) {
      if ("data" in updateError) {
        const errorMessage = updateError as any;
        toast.error(errorMessage.data.message);
      }
    }

    if (isSuccess) {
      refetch();
      toast.success("User role updated successfully.");
      setActive(false);
    }

    if (deleteSuccess) {
      refetch();
      toast.success("User deleted successfully.");
      setActive(false);
    }

    if (deleteError) {
      if ("data" in deleteError) {
        const errorMessage = deleteError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [isSuccess, deleteError, updateError, deleteSuccess, refetch]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !role || email.trim() === "") {
      toast.error("Invalid email or role");
      return;
    }
    console.log(email, role);
    await updateUserRole({ email, role });
    setOpen(false);
    setEmail("");
    setRole("");
  };

  const handleDelete = async () => {
    const id = userId;
    await deleteUser(id);
    setOpen(false);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "name", headerName: "Name", flex: 0.5 },
    { field: "email", headerName: "Email", flex: 0.8 },
    { field: "role", headerName: "Role", flex: 0.5 },
    { field: "courses", headerName: "Purchased", flex: 0.5 },
    { field: "created_at", headerName: "Joined At", flex: 0.5 },
    {
      field: "",
      headerName: "Email",
      flex: 0.2,
      renderCell: (params: any) => (
        <>
          <a href={`mailto:${params.row.email}`}>
            <AiOutlineMail className="dark:text-white text-black" size={20} />
          </a>
        </>
      ),
    },
    {
      field: "delete",
      headerName: "Delete",
      flex: 0.2,
      renderCell: (params: any) => (
        <>
          <Button
            onClick={() => {
              setOpen(!open);
              setUserId(params.row.id);
            }}
          >
            <AiOutlineDelete className="dark:text-white text-black" size={20} />
          </Button>
        </>
      ),
    },
  ];

  const rows: any = [];

  if (isTeam) {
    const admins =
      data && data.users.filter((item: any) => item.role === "admin");

    admins?.forEach((item: any) => {
      const { _id, name, email, courses, role, createdAt } = item;
      rows.push({
        id: _id,
        name,
        email,
        role,
        courses: courses.length,
        created_at: format(createdAt),
      });
    });
  } else {
    if (data?.users) {
      data.users.forEach((item: any) => {
        const { _id, name, email, role, courses, createdAt } = item;
        rows.push({
          id: _id,
          name,
          email,
          role,
          courses: courses.length,
          created_at: format(createdAt),
        });
      });
    }
  }

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box mr={"20px"}>
          {isTeam && (
            <div className="w-full flex justify-end mb-2">
              <button
                className={`${styles.button} !w-[220px]`}
                onClick={() => setActive(!active)}
              >
                Add New Member
              </button>
            </div>
          )}

          <Box
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                borderRadius: "8px",
                boxShadow:
                  theme === "dark"
                    ? "0 4px 20px rgba(0, 0, 0, 0.3)"
                    : "0 4px 20px rgba(0, 0, 0, 0.08)",
              },
              "& .css-1iyq7zh-MuiDataGrid-columnHeaders": {
                color: theme === "dark" ? "#fff" : "#1a1a1a",
                fontWeight: 600,
                fontSize: "0.95rem",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                padding: "16px 0",
              },
              "& .MuiDataGrid-sortIcon": {
                color: theme === "dark" ? "#4a90e2" : "#2563eb",
              },
              "& .MuiDataGrid-row": {
                color: theme === "dark" ? "#e0e0e0" : "#2c2c2c",
                borderBottom: "none",
                display: "flex",
                alignItems: "center",
                "&:hover": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(74, 144, 226, 0.5)"
                      : "rgba(37, 99, 235, 0.04)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-selected": {
                  backgroundColor:
                    theme === "dark"
                      ? "rgba(74, 144, 226, 0.12)"
                      : "rgba(37, 99, 235, 0.08)",
                  "&:hover": {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(74, 144, 226, 0.15)"
                        : "rgba(37, 99, 235, 0.12)",
                  },
                },
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
                padding: "16px",
                fontSize: "0.95rem",
                display: "flex",
                alignItems: "center",
                height: "100%",
                "& > *": {
                  width: "100%",
                },
              },
              "& .name-column--cell": {
                color: theme === "dark" ? "#e0e0e0" : "#2c2c2c",
                fontWeight: 500,
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(26, 31, 46, 0.95)"
                    : "rgba(248, 249, 250, 0.95)",
                backdropFilter: "blur(8px)",
                borderBottom:
                  theme === "dark"
                    ? "1px solid rgba(74, 144, 226, 0.2)"
                    : "1px solid rgba(37, 99, 235, 0.1)",
                "& .MuiDataGrid-columnHeader": {
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                },
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor:
                  theme === "dark"
                    ? "rgba(26, 31, 46, 0.95)"
                    : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#e0e0e0" : "#2c2c2c",
                borderTop:
                  theme === "dark"
                    ? "1px solid rgba(74, 144, 226, 0.2)"
                    : "1px solid rgba(37, 99, 235, 0.1)",
                backgroundColor:
                  theme === "dark"
                    ? "rgba(26, 31, 46, 0.98)"
                    : "rgba(248, 249, 250, 0.95)",
                backdropFilter: "blur(8px)",
                padding: "8px 16px",
                "& .MuiTablePagination-root": {
                  color: theme === "dark" ? "#e0e0e0" : "#2c2c2c",
                  "& .MuiTablePagination-select": {
                    color: theme === "dark" ? "#4a90e2" : "#2563eb",
                  },
                  "& .MuiTablePagination-selectIcon": {
                    color: theme === "dark" ? "#4a90e2" : "#2563eb",
                  },
                  "& .MuiTablePagination-displayedRows": {
                    color: theme === "dark" ? "#e0e0e0" : "#2c2c2c",
                  },
                  "& .MuiTablePagination-actions": {
                    "& .MuiIconButton-root": {
                      color: theme === "dark" ? "#4a90e2" : "#2563eb",
                      "&:hover": {
                        backgroundColor:
                          theme === "dark"
                            ? "rgba(74, 144, 226, 0.08)"
                            : "rgba(37, 99, 235, 0.04)",
                      },
                      "&.Mui-disabled": {
                        color:
                          theme === "dark"
                            ? "rgba(74, 144, 226, 0.3)"
                            : "rgba(37, 99, 235, 0.3)",
                      },
                    },
                  },
                },
              },
              "& .MuiCheckbox-root": {
                color:
                  theme === "dark"
                    ? "rgba(74, 144, 226, 0.7) !important"
                    : "rgba(37, 99, 235, 0.7) !important",
                "&.Mui-checked": {
                  color:
                    theme === "dark"
                      ? "#4a90e2 !important"
                      : "#2563eb !important",
                },
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: "16px",
                "& .MuiButton-text": {
                  color:
                    theme === "dark"
                      ? "rgba(74, 144, 226, 0.9) !important"
                      : "rgba(37, 99, 235, 0.9) !important",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor:
                      theme === "dark"
                        ? "rgba(74, 144, 226, 0.08)"
                        : "rgba(37, 99, 235, 0.04)",
                  },
                },
              },
              "& .MuiDataGrid-columnSeparator": {
                display: "none",
              },
              "& .MuiDataGrid-cell:focus": {
                outline: "none",
              },
              "& .MuiDataGrid-columnHeader:focus": {
                outline: "none",
              },
            }}
          >
            <DataGrid checkboxSelection rows={rows} columns={columns} />
          </Box>

          {active && (
            <Modal
              open={active}
              onClose={() => setActive(!active)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-5 flex flex-col p-8 rounded-lg shadow-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-[#111c43] border border-[#1f2547]"
                    : "bg-white border border-gray-200"
                }`}
                sx={{
                  width: {
                    xs: "90%",
                    sm: "400px",
                    md: "450px",
                  },
                  maxWidth: "450px",
                }}
              >
                <h1
                  className={`${styles.title} text-center mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Add New Member
                </h1>
                <form
                  className="flex flex-col gap-4 min-w-fit"
                  onSubmit={handleSubmit}
                >
                  <div className="relative">
                    <input
                      type="email"
                      inputMode="email"
                      placeholder="User Email"
                      className={`${styles.input} w-full ${
                        theme === "dark"
                          ? "bg-[#1a1f3c] text-white placeholder-gray-400"
                          : "bg-gray-50 text-gray-900 placeholder-gray-500"
                      }`}
                      value={email}
                      onChange={(e) => setEmail(e.target.value.trim())}
                      required
                    />
                  </div>
                  <div className="relative">
                    <select
                      className={`${
                        styles.input
                      } w-full appearance-none cursor-pointer transition-all duration-300 ${
                        theme === "dark"
                          ? "bg-[#1a1f3c] text-white hover:bg-[#1f2547]"
                          : "bg-gray-50 text-gray-900 hover:bg-gray-100"
                      }`}
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='${
                          theme === "dark" ? "%234a90e2" : "%232563eb"
                        }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 1rem center",
                        backgroundSize: "1.2em",
                        paddingRight: "2.5rem",
                      }}
                    >
                      <option
                        value="admin"
                        className={`py-2 ${
                          theme === "dark" ? "bg-[#1a1f3c]" : "bg-white"
                        }`}
                      >
                        Admin
                      </option>
                      <option
                        value="user"
                        className={`py-2 ${
                          theme === "dark" ? "bg-[#1a1f3c]" : "bg-white"
                        }`}
                      >
                        User
                      </option>
                    </select>
                  </div>
                  <button
                    type="submit"
                    className={`${
                      styles.button
                    } mt-2 w-full py-3 text-base font-medium transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-[#4a90e2] hover:bg-[#357abd]"
                        : "bg-[#2563eb] hover:bg-[#1d4ed8]"
                    }`}
                  >
                    Add Member
                  </button>
                </form>
              </Box>
            </Modal>
          )}

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                className={`absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-5 p-8 rounded-lg shadow-2xl backdrop-blur-sm ${
                  theme === "dark"
                    ? "bg-[#111c43] border border-[#1f2547]"
                    : "bg-white border border-gray-200"
                }`}
                sx={{
                  width: {
                    xs: "90%",
                    sm: "400px",
                    md: "450px",
                  },
                  maxWidth: "450px",
                }}
              >
                <h1
                  className={`${styles.title} text-center mb-6 ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Are you sure to delete this user?
                </h1>
                <div className="flex w-full items-center justify-between gap-4 mt-6">
                  <button
                    className={`${
                      styles.button
                    } !w-[120px] h-[40px] transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-gray-700 hover:bg-gray-600"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </button>
                  <button
                    className={`${
                      styles.button
                    } !w-[120px] h-[40px] transition-all duration-300 ${
                      theme === "dark"
                        ? "bg-red-600 hover:bg-red-700"
                        : "bg-red-500 hover:bg-red-600"
                    }`}
                    onClick={handleDelete}
                  >
                    Delete
                  </button>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllUsers;
