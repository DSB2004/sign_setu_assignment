"use client";
import React from "react";
import Image from "next/image";
import { useUserStore } from "@/store/user.store";
import Update from "./update";
import Avatar from "./avatar";
export default function View() {
  const { isLoading, isFetching, isError, user } = useUserStore();

  if (isError || !user || isFetching || isLoading) return <></>;
  return (
    <>
      <div className="flex   flex-col">
        <div className="flex items-end  flex-col w-full">
          <Update></Update>
        </div>

        <div className="flex gap-2 items-end my-4">
          {user.avatar ? (
            <>
              <Image
                src={user.avatar}
                alt="user"
                height={100}
                width={100}
              ></Image>
            </>
          ) : (
            <>
              <Image
                src={"/user.png"}
                alt="user"
                height={100}
                width={100}
              ></Image>
            </>
          )}

          <div>
            <h2 className="text-2xl font-bold">{user.username}</h2>
            <p>{user.email}</p>
          </div>
        </div>

        <div>
          <p>
            {user.bio} Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Ipsam enim sit aperiam laudantium magnam sapiente, quos quidem
            voluptas labore voluptate repudiandae unde dolorum nulla quam,
            veritatis esse aut voluptatem iste beatae, eos minus! Eos totam quos
            dolorum sit animi omnis aspernatur vero reprehenderit quas
            repudiandae. Consectetur nam vitae provident vero? Reiciendis neque
            non aliquid fugiat vero, facere adipisci quo suscipit quas earum
            ratione possimus rerum necessitatibus eum obcaecati beatae excepturi
            impedit. Fugit perspiciatis, odio minima est sequi exercitationem
            possimus voluptatem facere cupiditate modi delectus nostrum quae
            accusamus illo labore nisi velit commodi quaerat dolorum vel
            nesciunt debitis ratione dolorem! Asperiores nihil minus assumenda.
            Eum vitae earum ipsam corporis similique reprehenderit neque ratione
            quos aliquid cumque. Dicta sequi illo commodi ea!
          </p>
        </div>
      </div>
    </>
  );
}
