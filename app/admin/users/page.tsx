
import React from "react";
import {  columns } from "@/components/admin/table-users/columns";
import { DataTable } from "@/components/admin/table-users/data-table";
import { getUsers } from "@/lib/admin/actions/users";

const Page = async () => {

  const users = await getUsers();

  return (
    <section className="w-full rounded-2xl bg-white p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-xl font-semibold">All Users</h2>
      </div>

      <div className="mt-7 w-full overflow-hidden">
        <DataTable columns={columns} data={users} />
      </div>
    </section>
  );
};

export default Page;
