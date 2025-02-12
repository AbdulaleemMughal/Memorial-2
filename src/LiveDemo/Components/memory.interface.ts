export interface MemorySwitchInterface {
    name: string;
    switch: boolean
}

export interface ImageInterface {
    id: number;
    imageURL: string;
  }
  
  export interface MemoryInterface {
    id: number;
    name?: string;
    email?: string;
    msg?: string;
    date: number;
    month: string;
    year: number;
    images: ImageInterface[];  
  }
  
export const monthNames = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];
