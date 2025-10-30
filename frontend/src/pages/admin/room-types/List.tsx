import { AlertDialog } from "@/components/ui/alert-dialog";
import { useRoomTypes } from "@/hooks/admin/useRoomTypes";
import { Dialog } from "@radix-ui/react-dialog";
import { HomeIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function RoomTypeList
{
    const navigate = useNavigate();
    const { roomTypes, loading, pagination, fetchRoomTypes, deleteRoomType } = useRoomTypes();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchRoomTypes();
    }, [fetchRoomTypes]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
                        <HomeIcon className="h-8 w-8 text-primary" />
                        Room Types Management
                    </h1>
                    <p className="text-muted-foreground mt-1">Manage all room types in your System</p>
                </div>
                <Dialog open={isModalOpen}>

                </Dialog>
            </div>
        </div>
    )
}