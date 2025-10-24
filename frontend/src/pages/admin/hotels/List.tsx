import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useHotels } from '@/hooks/admin/useHotels';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Table } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  Building2,
  Plus,
  Search,
  Pencil,
  Trash2,
  Mail,
  Phone,
  MapPin,
  Loader2Icon,
  Eye,
} from 'lucide-react';

export function HotelList() {
  const navigate = useNavigate();
  const {
    hotels,
    loading,
    pagination,
    fetchHotels,
    deleteHotel,
  } = useHotels();

  const [searchTerm, setSearchTerm] = useState('');
  const [activeSearch, setActiveSearch] = useState('');
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingHotelId, setDeletingHotelId] = useState<number | null>(null);

  useEffect(() => {
    fetchHotels({ page: 1 });
  }, [fetchHotels]);

  const handleSearch = () => {
    setActiveSearch(searchTerm);
    fetchHotels({ search: searchTerm, page: 1 });
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setActiveSearch('');
    fetchHotels({ page: 1 });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleDeleteClick = (id: number) => {
    setDeletingHotelId(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (deletingHotelId) {
      const success = await deleteHotel(deletingHotelId);
      if (success) {
        setIsDeleteModalOpen(false);
        setDeletingHotelId(null);
        fetchHotels(activeSearch ? { search: activeSearch, page: pagination.currentPage } : { page: pagination.currentPage });
      }
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Building2 className="h-8 w-8 text-primary" />
            Hotels Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage all hotels in your system
          </p>
        </div>
        <Button onClick={() => navigate('/admin/hotels/create')} size="lg" className="gap-2">
          <Plus className="h-5 w-5" />
          Add New Hotel
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <Label htmlFor="search">Search Hotels</Label>
            <div className="relative mt-2">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                id="search"
                placeholder="Search by name, address, email or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSearch} variant="default" disabled={loading}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            {activeSearch && (
              <Button onClick={handleClearSearch} variant="outline" disabled={loading}>
                Clear
              </Button>
            )}
          </div>
        </div>
        {activeSearch && (
          <div className="mt-4 text-sm text-muted-foreground">
            Showing results for: <span className="font-semibold">"{activeSearch}"</span>
          </div>
        )}
      </Card>

      {/* Hotels Table */}
      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <thead>
              <tr className="bg-muted/50">
                <th className="p-4 text-left font-semibold">Hotel Name</th>
                <th className="p-4 text-left font-semibold">Contact</th>
                <th className="p-4 text-left font-semibold">Address</th>
                <th className="p-4 text-left font-semibold">Status</th>
                <th className="p-4 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="p-8">
                    <div className="flex justify-center items-center">
                      <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  </td>
                </tr>
              ) : hotels.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-muted-foreground">
                    No hotels found. Click "Add New Hotel" to create one.
                  </td>
                </tr>
              ) : (
                hotels.map((hotel) => (
                  <tr key={hotel.id} className="border-t hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <div className="flex items-start gap-3">
                        {hotel.image_url ? (
                          <img
                            src={hotel.image_url}
                            alt={hotel.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div>
                          <p className="font-semibold">{hotel.name}</p>
                          {hotel.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              {hotel.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{hotel.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                          <span>{hotel.phone}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{hotel.address}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {hotel.rooms_count !== undefined && (
                          <Badge variant="secondary">
                            {hotel.rooms_count} Rooms
                          </Badge>
                        )}
                        {hotel.staff_count !== undefined && (
                          <Badge variant="outline">
                            {hotel.staff_count} Staff
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                          title="View Details"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}
                          title="Edit"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(hotel.id)}
                          className="text-destructive hover:text-destructive"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && hotels.length > 0 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-muted-foreground">
              Showing {(pagination.currentPage - 1) * pagination.perPage + 1} to{' '}
              {Math.min(pagination.currentPage * pagination.perPage, pagination.total)} of{' '}
              {pagination.total} hotels
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.currentPage === 1 || loading}
                onClick={() => fetchHotels(activeSearch ? { search: activeSearch, page: pagination.currentPage - 1 } : { page: pagination.currentPage - 1 })}
              >
                Previous
              </Button>
              <div className="flex items-center gap-2 px-3">
                <span className="text-sm">
                  Page {pagination.currentPage} of {pagination.lastPage}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                disabled={pagination.currentPage === pagination.lastPage || loading}
                onClick={() => fetchHotels(activeSearch ? { search: activeSearch, page: pagination.currentPage + 1 } : { page: pagination.currentPage + 1 })}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </Card>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="text-muted-foreground mb-6">
              Are you sure you want to delete this hotel? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={() => {
                  setIsDeleteModalOpen(false);
                  setDeletingHotelId(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleConfirmDelete}
                disabled={loading}
              >
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}

