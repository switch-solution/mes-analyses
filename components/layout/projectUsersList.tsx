"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { getUsersProject } from "@/src/query/project.query";
export const ProjectUsersList = ({ users }: { users: getUsersProject }) => {
    const firstUser = users.at(0)
    const secondUser = users.at(1)
    const thirdUser = users.at(2)
    const first = {
        initial: {
            x: 20,
            rotate: -5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    const second = {
        initial: {
            x: -20,
            rotate: 5,
        },
        hover: {
            x: 0,
            rotate: 0,
        },
    };
    return (
        <motion.div
            initial="initial"
            animate="animate"
            whileHover="hover"
            // eslint-disable-next-line tailwindcss/no-custom-classname
            className="dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex size-full min-h-24 flex-1 flex-row space-x-2">
            {firstUser &&
                <motion.div
                    variants={first}
                    className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
                    <Image
                        src={firstUser.user.image ? firstUser.user.image : `${firstUser.user.UserOtherData.at(0)?.lastname?.slice(0, 1)}${firstUser.user.UserOtherData.at(0)?.firstname?.slice(0, 1)}`}
                        alt="avatar"
                        height="100"
                        width="100"
                        className="size-10 rounded-full"
                    />
                    <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
                        {firstUser?.user?.name}
                    </p>
                    <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
                        {firstUser?.role}
                    </p>
                </motion.div>}
            {secondUser &&
                <motion.div className="relative z-20 flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
                    <Image
                        src="https://github.com/shadcn.png"
                        alt="avatar"
                        height="100"
                        width="100"
                        className="size-10 rounded-full"
                    />
                    <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
                        Robert le directeur de projet
                    </p>
                    <p className="mt-4 rounded-full border border-green-500 bg-green-100 px-2 py-0.5 text-xs text-green-600 dark:bg-green-900/20">
                        Equipe editeur
                    </p>
                </motion.div>}
            {thirdUser &&
                <motion.div
                    variants={second}
                    className="flex h-full w-1/3 flex-col items-center justify-center rounded-2xl border border-neutral-200 bg-white p-4 dark:border-white/[0.1] dark:bg-black">
                    <Image
                        src="https://github.com/shadcn.png"
                        alt="avatar"
                        height="100"
                        width="100"
                        className="size-10 rounded-full"
                    />
                    <p className="mt-4 text-center text-xs font-semibold text-neutral-500 sm:text-sm">
                        Gertrude la responsable RH
                    </p>
                    <p className="mt-4 rounded-full border border-orange-500 bg-orange-100 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20">
                        Equipe client
                    </p>
                </motion.div>}
        </motion.div>
    );
};