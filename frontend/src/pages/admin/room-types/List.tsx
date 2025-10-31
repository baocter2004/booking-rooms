import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { CurrencyInput } from '@/components/ui/currency-input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Pagination } from '@/components/ui/pagination';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { TextArea } from '@/components/ui/text-area';
import { useRoomTypes } from '@/hooks/admin/useRoomTypes';
import { Eye, HomeIcon, Loader2Icon, Pencil, Plus, Search, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function RoomTypeList() {
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
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => setIsModalOpen(true)} size="lg" className="gap-2">
              <Plus className="h-8 w-8" />
              Add Room Type
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Room Type</DialogTitle>
              <DialogDescription>Add a new room type to the system</DialogDescription>
            </DialogHeader>
            <form className="space-y-4 mt-4 overflow-y-auto max-h-[70vh]">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter room type name" className="mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="display_name">Display Name</Label>
                <Input id="display_name" placeholder="Enter room type display name" className="mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <TextArea id="description" placeholder="Enter room type description" className="mt-2" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="base_price">Base Price</Label>
                <CurrencyInput
                  placeholder="1,000,000"
                  value={1000000}
                  onChange={() => {
                    console.log('hehe');
                  }}
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="capacity">Capacity</Label>
                <Input id="capacity" type="number" placeholder="Enter room type capacity" className="mt-2" />
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" type="button" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Room Type</Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Label htmlFor="search">Search Room Types</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input id="search" placeholder="Search..." className="pl-10" />
            </div>
          </div>
        </div>
      </Card>

      {/* Room Types Table */}
      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Display Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Capacity</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-8">
                    <div className="flex justify-center items-center">
                      <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  </TableCell>
                </TableRow>
              ) : roomTypes.length > 0 ? (
                roomTypes.map((roomType) => (
                  <TableRow key={roomType.id} className="hover:bg-accent/50">
                    <TableCell>{roomType.name}</TableCell>
                    <TableCell>{roomType.display_name}</TableCell>
                    <TableCell>{roomType.description}</TableCell>
                    <TableCell>{roomType.base_price}</TableCell>
                    <TableCell>{roomType.capacity}</TableCell>
                    <TableCell>{new Date(roomType.created_at).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(roomType.updated_at).toLocaleDateString()}</TableCell>
                    <TableCell className="p-4">
                      <div className="flex justify-center gap-2">
                        <Button variant="ghost" size="sm" title="View Details" className="h-8 w-8 p-0">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          title="Edit"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center p-8">
                    No room types found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && roomTypes.length > 0 && (
          <Pagination
            currentPage={pagination.currentPage}
            totalPages={pagination.lastPage}
            onPageChange={(page) => fetchRoomTypes({ page })}
            showCount={5}
            disabled={loading}
          />
        )}
      </Card>
    </div>
  );
}
