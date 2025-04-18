"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { addUser, getAllApiRequest } from "@/lib/apiRequest";
import {
  TableHead,
  TableRow,
  TableHeader,
  TableCell,
  TableBody,
  Table,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { FileEditIcon, SearchIcon, TrashIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import Image from "next/image";
import FileSearchAnimation from "@/components/FileSearchAnimation";
import { getTokenFromCookies } from "@/lib/cookies";
import { useRouter } from "next/navigation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { IUser } from "@/lib/types";

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleAddUser = async () => {
    try {
      const formData = {
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        password: process.env.NEXT_PUBLIC_USER_PASSWORD,
        role,
      };

      await addUser(formData);
      router.refresh(); // or re-fetch your user list
    } catch (error) {
      console.error("Add user error:", error);
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = getTokenFromCookies();

      if (!token) {
        setError("Authentication token not found");
        setLoading(false);
        return;
      }

      try {
        const response = await getAllApiRequest<IUser[]>("/api/users/", token);
        setUsers(response);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleActivationToggle = async (user: IUser) => {
    // Implement activation toggle logic
  };

  const handleDeactivationToggle = async (user: IUser) => {
    // Implement deactivation toggle logic
  };

  return (
    <SidebarProvider>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold">Lenders</h1>
            <div className="w-full flex-1">
              <form>
                <div className="relative w-[60vw]">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="w-full bg-white shadow-none appearance-none pl-8 md:w-2/3 lg:w-1/3 dark:bg-gray-950"
                    placeholder="Search lender..."
                    type="search"
                  />
                </div>
              </form>
            </div>
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">Add User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>
                  Fill out the form to add a new user.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="name">
                    First Name
                  </Label>
                  <Input
                    className="col-span-3"
                    id="firstName"
                    placeholder="Enter First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="name">
                    Last Name
                  </Label>
                  <Input
                    className="col-span-3"
                    id="lastName"
                    placeholder="Enter Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="name">
                    Phone Number
                  </Label>
                  <Input
                    className="col-span-3"
                    id="phoneNumber"
                    placeholder="Enter Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    className="col-span-3"
                    id="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="password">
                    Password
                  </Label>
                  <Input
                    className="col-span-3"
                    id="password"
                    placeholder="***********"
                    disabled
                    value={process.env.NEXT_PUBLIC_USER_PASSWORD}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label className="text-right" htmlFor="role">
                    Role
                  </Label>
                  <div className="col-span-3" defaultValue="viewer" id="role">
                    <Select onValueChange={(val) => setRole(val)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="EXECUTIVE">Executive</SelectItem>
                        <SelectItem value="FINANCE">Finance</SelectItem>
                        <SelectItem value="CUSTOMER_SUPPORT">
                          Customer Support
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddUser}>Submit</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div className="border rounded-lg shadow-sm overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Profile</TableHead>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Designation</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Active</TableHead>
                <TableHead>Deactivated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="flex justify-center items-center text-center h-screen"
                  >
                    <FileSearchAnimation />
                  </TableCell>
                </TableRow>
              ) : error ? (
                <TableRow>
                  <TableCell
                    colSpan={11}
                    className="text-center text-red-500 py-4"
                  >
                    {error}
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Avatar>
                        <AvatarImage
                          src={user.img || "/noavatar.png"}
                          alt={`${user.first_name} ${user.last_name}`}
                        />
                        <AvatarFallback className="bg-gray-100 text-gray-600 rounded-full">
                          {user.first_name.charAt(0).toUpperCase()}
                          {user.last_name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </TableCell>
                    <TableCell>{user.first_name}</TableCell>
                    <TableCell>{user.last_name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.designation}</TableCell>
                    <TableCell>{user.created_at?.slice(0, 10)}</TableCell>
                    <TableCell>{user.updated_at?.slice(0, 10)}</TableCell>
                    <TableCell>{user.gender}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.is_active}
                            onChange={() => handleActivationToggle(user)}
                            disabled={user.is_active || user.is_deactivated}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={user.is_deactivated}
                            onChange={() => handleDeactivationToggle(user)}
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-red-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                        </label>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
        <Dialog>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Delete User</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this user? This action cannot be
                undone.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction>Delete</AlertDialogAction>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <Dialog>
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
              <DialogDescription />
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </main>
    </SidebarProvider>
  );
};

export default UsersPage;
