export interface GalleryInterface {
    name: string;
    switch: boolean;
};

export interface FolderInterface {
    id: string | number;
    name: string;
}

export interface ImageInterface {
    id: number;
    imageURL: string;
    folderName?: string[];
}