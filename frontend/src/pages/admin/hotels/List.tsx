import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useHotels } from '@/hooks/admin/useHotels';
import { DEFAULT_SORT, type HotelFilters } from '@/constants/filters';
import { hotelFilterSchema, type HotelFilterData } from '@/validates/admin/hotelSchema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pagination } from '@/components/ui/pagination';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
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
  Hotel,
  Users,
  Calendar,
  Briefcase,
  ChevronDown,
  ChevronUp,
  X,
  Filter,
  SortAsc,
  CalendarIcon,
} from 'lucide-react';

interface SearchFilters extends Omit<HotelFilters, 'page'> {
  search: string;
  name: string;
  address: string;
  email: string;
  phone: string;
  from_date: string;
  to_date: string;
  sort: string;
}

const DEFAULT_FILTERS: SearchFilters = {
  search: '',
  name: '',
  address: '',
  email: '',
  phone: '',
  from_date: '',
  to_date: '',
  sort: DEFAULT_SORT,
};

export function HotelList() {
  const navigate = useNavigate();
  const { hotels, loading, pagination, fetchHotels, deleteHotel } = useHotels();

  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [activeFilters, setActiveFilters] = useState<SearchFilters>(DEFAULT_FILTERS);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingHotelId, setDeletingHotelId] = useState<number | null>(null);

  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<HotelFilterData>({
    resolver: zodResolver(hotelFilterSchema),
    defaultValues: DEFAULT_FILTERS,
    mode: 'onChange',
  });

  const filters = watch();

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);

  const onSubmit = (data: HotelFilterData) => {
    const searchFilters = { ...data } as SearchFilters;
    setActiveFilters(searchFilters);
    fetchHotels({ ...searchFilters, page: 1 });
  };

  const handleClearSearch = () => {
    reset(DEFAULT_FILTERS);
    setActiveFilters(DEFAULT_FILTERS);
    fetchHotels();
  };

  const handleFilterChange = (key: keyof SearchFilters, value: string) => {
    setValue(key as keyof HotelFilterData, value, { 
      shouldValidate: true,
      shouldDirty: true 
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSubmit(onSubmit)();
    }
  };

  const hasActiveFilters = () => {
    return (
      activeFilters.search ||
      activeFilters.name ||
      activeFilters.address ||
      activeFilters.email ||
      activeFilters.phone ||
      activeFilters.from_date ||
      activeFilters.to_date ||
      activeFilters.sort !== DEFAULT_SORT
    );
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (activeFilters.search) count++;
    if (activeFilters.name) count++;
    if (activeFilters.address) count++;
    if (activeFilters.email) count++;
    if (activeFilters.phone) count++;
    if (activeFilters.from_date) count++;
    if (activeFilters.to_date) count++;
    if (activeFilters.sort !== DEFAULT_SORT) count++;
    return count;
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
        fetchHotels({ ...activeFilters, page: pagination.currentPage });
      }
    }
  };

  const handleRemoveFilter = (key: keyof SearchFilters) => {
    const newValue = key === 'sort' ? DEFAULT_SORT : '';
    setValue(key as keyof HotelFilterData, newValue, { shouldValidate: true });
    
    const newFilters = { ...activeFilters, [key]: newValue };
    setActiveFilters(newFilters);
    fetchHotels({ ...newFilters, page: 1 });
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
          <p className="text-muted-foreground mt-1">Manage all hotels in your system</p>
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
                value={filters.search}
                onChange={(e) => handleFilterChange('search', e.target.value)}
                onKeyDown={handleKeyDown}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              variant="outline"
              disabled={loading}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              Advanced
              {showAdvancedSearch ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
              {getActiveFiltersCount() > 0 && (
                <Badge variant="default" className="ml-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
            <Button onClick={handleSubmit(onSubmit)} variant="default" disabled={loading || !!errors.from_date}>
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
            {hasActiveFilters() && (
              <Button onClick={handleClearSearch} variant="outline" disabled={loading}>
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>

        {/* Advanced Search Section */}
        {showAdvancedSearch && (
          <div className="mt-6 pt-6 border-t space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="filter-name">Hotel Name</Label>
                <Input
                  id="filter-name"
                  placeholder="Filter by name..."
                  value={filters.name}
                  onChange={(e) => handleFilterChange('name', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="filter-address">Address</Label>
                <Input
                  id="filter-address"
                  placeholder="Filter by address..."
                  value={filters.address}
                  onChange={(e) => handleFilterChange('address', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="filter-email">Email</Label>
                <Input
                  id="filter-email"
                  placeholder="Filter by email..."
                  value={filters.email}
                  onChange={(e) => handleFilterChange('email', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="filter-phone">Phone</Label>
                <Input
                  id="filter-phone"
                  placeholder="Filter by phone..."
                  value={filters.phone}
                  onChange={(e) => handleFilterChange('phone', e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="filter-from-date">From Date</Label>
                <div className="relative mt-2">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="filter-from-date"
                    type="date"
                    value={filters.from_date || ''}
                    onChange={(e) => handleFilterChange('from_date', e.target.value)}
                    max={filters.to_date || undefined}
                    className={`pl-10 ${errors.from_date ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="filter-to-date">To Date</Label>
                <div className="relative mt-2">
                  <CalendarIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="filter-to-date"
                    type="date"
                    value={filters.to_date || ''}
                    onChange={(e) => handleFilterChange('to_date', e.target.value)}
                    min={filters.from_date || undefined}
                    className={`pl-10 ${errors.from_date ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
                  />
                </div>
              </div>
            </div>

            {errors.from_date && (
              <div className="flex items-center gap-2 text-sm text-red-600 bg-red-50 p-3 rounded-md">
                <X className="h-4 w-4" />
                <span>{errors.from_date.message}</span>
              </div>
            )}

            <div className="flex items-end gap-4">
              <div className="flex-1 max-w-xs">
                <Label htmlFor="sort">Sort By</Label>
                <Select
                  value={filters.sort}
                  onValueChange={(value) => handleFilterChange('sort', value)}
                >
                  <SelectTrigger className="mt-2">
                    <SelectContent size="lg">
                      <SelectItem value="created_at:desc">Newest First</SelectItem>
                      <SelectItem value="created_at:asc">Oldest First</SelectItem>
                      <SelectItem value="name:asc">Name (A-Z)</SelectItem>
                      <SelectItem value="name:desc">Name (Z-A)</SelectItem>
                      <SelectItem value="rooms_count:desc">Most Rooms</SelectItem>
                      <SelectItem value="rooms_count:asc">Least Rooms</SelectItem>
                      <SelectItem value="staff_count:desc">Most Staff</SelectItem>
                      <SelectItem value="staff_count:asc">Least Staff</SelectItem>
                    </SelectContent>
                  </SelectTrigger>
                </Select>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters() && (
          <div className="mt-4 pt-4 border-t">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-medium text-muted-foreground">Active Filters:</span>
              {activeFilters.search && (
                <Badge variant="secondary" className="gap-1">
                  Search: {activeFilters.search}
                  <button
                    onClick={() => handleRemoveFilter('search')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.name && (
                <Badge variant="secondary" className="gap-1">
                  Name: {activeFilters.name}
                  <button
                    onClick={() => handleRemoveFilter('name')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.address && (
                <Badge variant="secondary" className="gap-1">
                  Address: {activeFilters.address}
                  <button
                    onClick={() => handleRemoveFilter('address')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.email && (
                <Badge variant="secondary" className="gap-1">
                  Email: {activeFilters.email}
                  <button
                    onClick={() => handleRemoveFilter('email')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.phone && (
                <Badge variant="secondary" className="gap-1">
                  Phone: {activeFilters.phone}
                  <button
                    onClick={() => handleRemoveFilter('phone')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.from_date && (
                <Badge variant="secondary" className="gap-1">
                  From: {activeFilters.from_date}
                  <button
                    onClick={() => handleRemoveFilter('from_date')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.to_date && (
                <Badge variant="secondary" className="gap-1">
                  To: {activeFilters.to_date}
                  <button
                    onClick={() => handleRemoveFilter('to_date')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
              {activeFilters.sort !== DEFAULT_SORT && (
                <Badge variant="secondary" className="gap-1">
                  <SortAsc className="h-3 w-3" />
                  Sort: {activeFilters.sort.replace(':', ' ').replace('_', ' ')}
                  <button
                    onClick={() => handleRemoveFilter('sort')}
                    className="ml-1 hover:bg-secondary-foreground/20 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Hotels Table */}
      <Card className="p-6">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="p-4 text-left font-semibold">Hotel Name</TableHead>
                <TableHead className="p-4 text-left font-semibold">Contact</TableHead>
                <TableHead className="p-4 text-left font-semibold">Address</TableHead>
                <TableHead className="p-4 text-left font-semibold">Room Count</TableHead>
                <TableHead className="p-4 text-left font-semibold">Staff Count</TableHead>
                <TableHead className="p-4 text-left font-semibold">Service Count</TableHead>
                <TableHead className="p-4 text-left font-semibold">Booking Count</TableHead>
                <TableHead className="p-4 text-center font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <td colSpan={8} className="p-8">
                    <div className="flex justify-center items-center">
                      <Loader2Icon className="h-8 w-8 animate-spin text-primary" />
                    </div>
                  </td>
                </TableRow>
              ) : hotels.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="p-8 text-center text-muted-foreground">
                    No hotels found. Click "Add New Hotel" to create one.
                  </TableCell>
                </TableRow>
              ) : (
                hotels.map((hotel) => (
                  <TableRow key={hotel.id} className="border-t hover:bg-muted/30 transition-colors">
                    <TableCell className="p-4 text-left">
                      <div className="flex items-start gap-3 max-w-xs">
                        {hotel.image_url ? (
                          <img
                            src={hotel.image_url}
                            alt={hotel.name}
                            className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <Building2 className="h-6 w-6 text-primary" />
                          </div>
                        )}
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold truncate">{hotel.name}</p>
                          {hotel.description && (
                            <p className="text-sm text-muted-foreground line-clamp-1">{hotel.description}</p>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
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
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{hotel.address}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex justify-center">
                        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                          <Hotel className="h-3.5 w-3.5" />
                          {hotel.rooms_count || 0} Rooms
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex justify-center">
                        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                          <Users className="h-3.5 w-3.5" />
                          {hotel.staff_count || 0} Staff
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex justify-center">
                        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                          <Briefcase className="h-3.5 w-3.5" />
                          {hotel.services_count || 0} Services
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="p-4 text-center">
                      <div className="flex justify-center">
                        <Badge variant="secondary" className="gap-1.5 px-3 py-1">
                          <Calendar className="h-3.5 w-3.5" />
                          {hotel.bookings_count || 0} Bookings
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex justify-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}`)}
                          title="View Details"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigate(`/admin/hotels/${hotel.id}/edit`)}
                          title="Edit"
                          className="h-8 w-8 p-0 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                        >
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteClick(hotel.id)}
                          className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Pagination */}
        {!loading && hotels.length > 0 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t">
            <p className="text-sm text-muted-foreground">
              Showing <span className="font-medium">{(pagination.currentPage - 1) * pagination.perPage + 1}</span> to{' '}
              <span className="font-medium">
                {Math.min(pagination.currentPage * pagination.perPage, pagination.total)}
              </span>{' '}
              of <span className="font-medium">{pagination.total}</span> hotels
            </p>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={pagination.lastPage}
              onPageChange={(page) => fetchHotels({ ...activeFilters, page })}
              showCount={5}
              disabled={loading}
            />
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
              <Button variant="destructive" onClick={handleConfirmDelete} disabled={loading}>
                {loading ? 'Deleting...' : 'Delete'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
