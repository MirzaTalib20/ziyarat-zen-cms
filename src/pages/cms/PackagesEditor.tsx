import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addPackage, updatePackage, removePackage } from '@/store/slices/packagesSlice';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditorField } from '@/components/cms/EditorField';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export const PackagesEditor = () => {
  const dispatch = useDispatch();
  const packages = useSelector((state: RootState) => state.packages.packages);
  const { toast } = useToast();

  const handleAddPackage = () => {
    dispatch(addPackage({
      id: Date.now().toString(),
      title: 'New Package',
      duration: '10 Days',
      price: 2500,
      route: 'Route description',
      image: '',
      description: 'Package description',
      ctaLink: '/packages/new',
    }));
  };

  const handleSave = () => {
    toast({
      title: 'Changes Saved',
      description: 'Packages have been updated successfully.',
    });
  };

  return (
    <CMSLayout title="Edit Packages" onSave={handleSave}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground">Tour Packages</h2>
          <Button
            onClick={handleAddPackage}
            className="gradient-primary text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Package
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {packages.map((pkg) => (
            <Card key={pkg.id} className="p-6 space-y-4">
              <h3 className="text-lg font-semibold text-foreground">{pkg.title}</h3>

              <EditorField
                label="Title"
                type="text"
                value={pkg.title}
                onChange={(title) => dispatch(updatePackage({ ...pkg, title }))}
                placeholder="Package title"
              />

              <EditorField
                label="Description"
                type="textarea"
                value={pkg.description}
                onChange={(description) => dispatch(updatePackage({ ...pkg, description }))}
                placeholder="Package description"
              />

              <EditorField
                label="Route"
                type="textarea"
                value={pkg.route}
                onChange={(route) => dispatch(updatePackage({ ...pkg, route }))}
                placeholder="Route description"
              />

              <div className="grid grid-cols-2 gap-4">
                <EditorField
                  label="Duration"
                  type="text"
                  value={pkg.duration}
                  onChange={(duration) => dispatch(updatePackage({ ...pkg, duration }))}
                  placeholder="10 Days"
                />

                <EditorField
                  label="Price ($)"
                  type="text"
                  value={pkg.price.toString()}
                  onChange={(price) => dispatch(updatePackage({ ...pkg, price: parseFloat(price) || 0 }))}
                  placeholder="2500"
                />
              </div>

              <EditorField
                label="Image URL"
                type="text"
                value={pkg.image}
                onChange={(image) => dispatch(updatePackage({ ...pkg, image }))}
                placeholder="https://example.com/image.jpg"
              />

              <EditorField
                label="CTA Link"
                type="text"
                value={pkg.ctaLink}
                onChange={(ctaLink) => dispatch(updatePackage({ ...pkg, ctaLink }))}
                placeholder="/packages/detail"
              />

              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => dispatch(removePackage(pkg.id))}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove Package
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </CMSLayout>
  );
};
