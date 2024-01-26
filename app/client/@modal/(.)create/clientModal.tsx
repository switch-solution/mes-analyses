
'use client';

import React from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { Dialog } from '@/components/ui/dialog';
import { DialogContent } from '@radix-ui/react-dialog';
import CreateClient from '@/app/client/create/page';
export default function ClientModal() {

    return (
        <Dialog>
            <DialogContent>
                <CreateClient />

            </DialogContent>
        </Dialog>


    )
}


