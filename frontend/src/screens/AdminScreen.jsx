import React, { useEffect, useState } from "react";
import {
  useGetUsersMutation,
  useBlockUserMutation,
  useDeleteUserMutation,
  useSearchUsersMutation,
} from "../slices/adminApiSlice";
import { Button, Col, Row, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEditUserCredentials } from "../slices/editUserSlice";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap";
import Search from "../components/Search";

const AdminScreen = () => {
  const [getUsers, { usersLoading, usersError }] = useGetUsersMutation();
  const [searchUsers, { searchLoading, searchError }] =
    useSearchUsersMutation();
  const [blockUser, { blockUserLoading, blockUserError }] =
    useBlockUserMutation();
  const [deleteUser, { deleteUserLoading, deleteUserError }] =
    useDeleteUserMutation();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState(null);

  const fetchData = async () => {
    try {
      const result = await getUsers();
      setUsers(result.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [getUsers]);

  const handleSearch = async (searchTerm) => {
    if (searchTerm.length <= 0) {
      setSearchResults(null);
      toast.error("Please enter search term");
    } else {
      const res = await searchUsers({ searchTerm });
      if (res.error) {
        toast.error(res.error.data.message);
      }
      setSearchResults(res.data);
    }
  };

  const handleBlockUser = async (userId) => {
    try {
      await blockUser({ userId });
      toast.success("Blocked/unblocked user successfully");
      fetchData();
    } catch (err) {
      toast.error("Error blocking/unblocking user");
    }
  };

  const handleSetEditUser = async (user) => {
    dispatch(setEditUserCredentials({ ...user }));
    navigate("/edit-user");
  };

  const handleDeleteUser = async (userId) => {
    try {
      const res = await deleteUser({ userId });
      toast.success(res.data.message);
    } catch (err) {
      toast.error("Error deleting user");
    }
  };

  return (
    <>
      <Search handleSearch={handleSearch} searchLoading={searchLoading} />

      {usersLoading && <Loader />}
      {users && (
        <>
          {usersLoading && <Loader />}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h1 style={{ margin: "1em 0" }}>Users List</h1>
            <LinkContainer to="/add-user">
              <Button variant="secondary">Add User</Button>
            </LinkContainer>
          </div>

          {searchResults && (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {searchResults.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="primary"
                          onClick={() => handleSetEditUser(user)}
                        >
                          Edit
                        </Button>

                        {user.blocked ? (
                          <Button
                            variant="success"
                            onClick={() => handleBlockUser(user._id)}
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => handleBlockUser(user._id)}
                          >
                            Block
                          </Button>
                        )}
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
          {users && !searchResults && (
            <>
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>
                        {/* <LinkContainer to={`/edit-user/${user._id}`}> */}
                        <Button
                          style={{ marginRight: "10px" }}
                          variant="primary"
                          onClick={() => handleSetEditUser(user)}
                        >
                          Edit
                        </Button>
                        {/* </LinkContainer> */}

                        {user.blocked ? (
                          <Button
                            variant="success"
                            onClick={() => handleBlockUser(user._id)}
                          >
                            Unblock
                          </Button>
                        ) : (
                          <Button
                            variant="danger"
                            onClick={() => handleBlockUser(user._id)}
                          >
                            Block
                          </Button>
                        )}
                        <Button
                          style={{ marginLeft: "10px" }}
                          variant="danger"
                          onClick={() => handleDeleteUser(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </>
      )}
    </>
  );
};

export default AdminScreen;
