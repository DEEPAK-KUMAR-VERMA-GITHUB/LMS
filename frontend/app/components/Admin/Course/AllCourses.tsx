import React, { FC, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { Box, Button, Modal } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import {
  useDeleteCourseMutation,
  useGetAllCoursesQuery,
} from "@/redux/features/courses/courseApi";
import Loader from "../../Loader/Loader";
import { format } from "timeago.js";
import { styles } from "@/app/styles/style";
import toast from "react-hot-toast";
import Link from "next/link";

const AllCourses: FC = () => {
  const { theme, setTheme } = useTheme();
  const {
    data,
    isLoading,
    refetch,
    error: courseFetchError,
  } = useGetAllCoursesQuery(undefined, { refetchOnMountOrArgChange: true });
  const [open, setOpen] = useState(false);
  const [courseId, setCourseId] = useState("");
  const [deleteCourse, { isSuccess, error }] = useDeleteCourseMutation({});

  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "title", headerName: "Course Title", flex: 1 },
    { field: "ratings", headerName: "Ratings", flex: 0.3 },
    { field: "purchased", headerName: "Purchased", flex: 0.3 },
    { field: "created_at", headerName: "Created At", flex: 0.5 },
    {
      field: "edit",
      headerName: "Edit",
      flex: 0.2,
      renderCell: (params: any) => (
        <>
          <Link href={`/admin/edit-course/${params.row.id}`} className="flex items-center justify-center h-full">
            <FiEdit2 className="dark:text-white text-black hover:text-blue-800 " size={20} />
          </Link>
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
              setCourseId(params.row.id);
            }}
          >
            <AiOutlineDelete className="text-red-900 hover:text-red-700 transition" size={20} />
          </Button>
        </>
      ),
    },
  ];

  const rows = [];

  if (data?.courses) {
    data.courses.forEach(
      (item: {
        _id: string;
        name: string;
        ratings: number;
        purchased: number;
        createdAt: string;
      }) => {
        const { _id, name, ratings, purchased, createdAt } = item;
        rows.push({
          id: _id,
          title: name,
          ratings,
          purchased,
          created_at: format(createdAt),
        });
      }
    );
  }

  const handleDelete = async () => {
    const id = courseId;
    await deleteCourse(id);
  };

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      refetch();
      toast.success("Course Deleted Successfully!");
    }
    if (error) {
      if ("data" in error) {
        const errorMessage = error as any;
        toast.error(errorMessage.data.message);
      }
    }
    if (courseFetchError) {
      if ("data" in courseFetchError) {
        const errorMessage = courseFetchError as any;
        toast.error(errorMessage.data.message);
      }
    }
  }, [error, isSuccess, courseFetchError, refetch]);

  return (
    <div className="mt-[120px]">
      {isLoading ? (
        <Loader />
      ) : (
        <Box mr={"20px"}>
          <Box
            height="80vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
                outline: "none",
                borderRadius: "8px",
                boxShadow: theme === "dark" 
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
                  backgroundColor: theme === "dark" 
                    ? "rgba(74, 144, 226, 0.5)" 
                    : "rgba(37, 99, 235, 0.04)",
                  transform: "translateY(-1px)",
                },
                "&.Mui-selected": {
                  backgroundColor: theme === "dark" 
                    ? "rgba(74, 144, 226, 0.12)" 
                    : "rgba(37, 99, 235, 0.08)",
                  "&:hover": {
                    backgroundColor: theme === "dark" 
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
                backgroundColor: theme === "dark" 
                  ? "rgba(26, 31, 46, 0.95)" 
                  : "rgba(248, 249, 250, 0.95)",
                backdropFilter: "blur(8px)",
                borderBottom: theme === "dark" 
                  ? "1px solid rgba(74, 144, 226, 0.2)" 
                  : "1px solid rgba(37, 99, 235, 0.1)",
                "& .MuiDataGrid-columnHeader": {
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                },
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: theme === "dark" 
                  ? "rgba(26, 31, 46, 0.95)" 
                  : "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(8px)",
              },
              "& .MuiDataGrid-footerContainer": {
                color: theme === "dark" ? "#e0e0e0" : "#2c2c2c",
                borderTop: theme === "dark" 
                  ? "1px solid rgba(74, 144, 226, 0.2)" 
                  : "1px solid rgba(37, 99, 235, 0.1)",
                backgroundColor: theme === "dark" 
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
                        backgroundColor: theme === "dark" 
                          ? "rgba(74, 144, 226, 0.08)" 
                          : "rgba(37, 99, 235, 0.04)",
                      },
                      "&.Mui-disabled": {
                        color: theme === "dark" ? "rgba(74, 144, 226, 0.3)" : "rgba(37, 99, 235, 0.3)",
                      },
                    },
                  },
                },
              },
              "& .MuiCheckbox-root": {
                color: theme === "dark" 
                  ? "rgba(74, 144, 226, 0.7) !important" 
                  : "rgba(37, 99, 235, 0.7) !important",
                "&.Mui-checked": {
                  color: theme === "dark" 
                    ? "#4a90e2 !important" 
                    : "#2563eb !important",
                },
              },
              "& .MuiDataGrid-toolbarContainer": {
                padding: "16px",
                "& .MuiButton-text": {
                  color: theme === "dark" 
                    ? "rgba(74, 144, 226, 0.9) !important" 
                    : "rgba(37, 99, 235, 0.9) !important",
                  fontWeight: 500,
                  "&:hover": {
                    backgroundColor: theme === "dark" 
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

          {open && (
            <Modal
              open={open}
              onClose={() => setOpen(!open)}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 z-5">
                <h1 className={styles.title}>
                  Are you sure you want to delete this course ?
                </h1>
                <div className="flex w-full items-center justify-between mb-6 mt-6 ">
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] `}
                    onClick={() => setOpen(!open)}
                  >
                    Cancel
                  </div>
                  <div
                    className={`${styles.button} !w-[120px] h-[30px] bg-[crimson] `}
                    onClick={handleDelete}
                  >
                    Delete
                  </div>
                </div>
              </Box>
            </Modal>
          )}
        </Box>
      )}
    </div>
  );
};

export default AllCourses;
