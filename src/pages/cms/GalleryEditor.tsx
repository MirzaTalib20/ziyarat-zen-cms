import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { addGalleryItem, updateGalleryItem, removeGalleryItem } from '@/store/slices/gallerySlice';
import { CMSLayout } from '@/components/cms/CMSLayout';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { EditorField } from '@/components/cms/EditorField';
import { useToast } from '@/hooks/use-toast';
import { Plus, Trash2 } from 'lucide-react';

export const GalleryEditor = () => {
  const dispatch = useDispatch();
  const gallery = useSelector((state: RootState) => state.gallery);
  const { toast } = useToast();

  const handleAddItem = () => {
    dispatch(addGalleryItem({
      id: Date.now().toString(),
      file: '',
      caption: 'New item',
      type: 'image',
    }));
  };

  const handleSave = () => {
    toast({
      title: 'Changes Saved',
      description: 'Gallery has been updated successfully.',
    });
  };

  return (
    <CMSLayout title="Edit Gallery" onSave={handleSave}>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-foreground">Gallery Items</h2>
          <Button
            onClick={handleAddItem}
            className="gradient-primary text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gallery.items.map((item) => (
            <Card key={item.id} className="p-4 space-y-4">
              <div className="aspect-[4/3] rounded-lg overflow-hidden bg-muted">
                {item.file ? (
                  item.type === 'image' ? (
                    <img src={item.file} alt={item.caption} className="w-full h-full object-cover" />
                  ) : (
                    <video src={item.file} controls className="w-full h-full object-cover" />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <span>No media</span>
                  </div>
                )}
              </div>

              <EditorField
                label="Media URL"
                type="text"
                value={item.file}
                onChange={(file) => dispatch(updateGalleryItem({ ...item, file }))}
                placeholder="https://example.com/image.jpg"
              />

              <EditorField
                label="Media Type"
                type="select"
                value={item.type}
                onChange={(type) => dispatch(updateGalleryItem({ ...item, type: type as 'image' | 'video' }))}
                options={[
                  { value: 'image', label: 'Image' },
                  { value: 'video', label: 'Video' },
                ]}
              />

              <EditorField
                label="Caption"
                type="text"
                value={item.caption}
                onChange={(caption) => dispatch(updateGalleryItem({ ...item, caption }))}
                placeholder="Description"
              />

              <Button
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => dispatch(removeGalleryItem(item.id))}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Remove
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </CMSLayout>
  );
};
