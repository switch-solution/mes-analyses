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
            className="flex flex-1 w-full h-full min-h-[6rem] dark:bg-dot-white/[0.2] bg-dot-black/[0.2] flex-row space-x-2">
            {firstUser &&
                <motion.div
                    variants={first}
                    className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                    <Image
                        src={firstUser.user.image ? firstUser.user.image : `${firstUser.user.UserOtherData.at(0)?.lastname?.slice(0, 1)}${firstUser.user.UserOtherData.at(0)?.firstname?.slice(0, 1)}`}
                        alt="avatar"
                        height="100"
                        width="100"
                        className="rounded-full h-10 w-10"
                    />
                    <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        {firstUser?.user?.name}
                    </p>
                    <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                        {firstUser?.role}
                    </p>
                </motion.div>}
            {secondUser &&
                <motion.div className="h-full relative z-20 w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                    <Image
                        src="https://github.com/shadcn.png"
                        alt="avatar"
                        height="100"
                        width="100"
                        className="rounded-full h-10 w-10"
                    />
                    <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Robert le directeur de projet
                    </p>
                    <p className="border border-green-500 bg-green-100 dark:bg-green-900/20 text-green-600 text-xs rounded-full px-2 py-0.5 mt-4">
                        Equipe editeur
                    </p>
                </motion.div>}
            {thirdUser &&
                <motion.div
                    variants={second}
                    className="h-full w-1/3 rounded-2xl bg-white p-4 dark:bg-black dark:border-white/[0.1] border border-neutral-200 flex flex-col items-center justify-center">
                    <Image
                        src="https://github.com/shadcn.png"
                        alt="avatar"
                        height="100"
                        width="100"
                        className="rounded-full h-10 w-10"
                    />
                    <p className="sm:text-sm text-xs text-center font-semibold text-neutral-500 mt-4">
                        Gertrude la responsable RH
                    </p>
                    <p className="border border-orange-500 bg-orange-100 dark:bg-orange-900/20 text-orange-600 text-xs rounded-full px-2 py-0.5 mt-4">
                        Equipe client
                    </p>
                </motion.div>}
        </motion.div>
    );
};