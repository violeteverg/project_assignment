import { Card, CardContent } from "../../ui/card";
import { Skeleton } from "../../ui/skeleton";

export function Loader() {
  return (
    <Card className='grid grid-cols-[2fr,1fr] my-4 items-center p-2 lg:flex lg:justify-between md:flex md:justify-between'>
      <div className='grid grid-cols-2 items-center gap-4 lg:w-full md:w-full'>
        <div className='lg:grid lg:grid-cols-2 items-center'>
          <Skeleton className='w-32 h-6' />
          <Skeleton className='w-24 h-4 mt-2' />
        </div>
        <Skeleton className='w-16 h-6' />
      </div>
      <CardContent className='justify-end flex w-full lg:w-[40%]'>
        <Skeleton className='w-20 h-10' />
      </CardContent>
    </Card>
  );
}

export function ChartSkeleton() {
  return (
    <div className="'border border-black rounded-lg w-full lg:w-[70%] p-2'">
      <div className='min-h-[200px] w-full'>
        <div className='flex flex-col space-y-2'>
          <Skeleton className='h-8 w-full rounded' />
          <Skeleton className='h-8 w-full rounded' />
          <Skeleton className='h-8 w-full rounded' />
          <Skeleton className='h-8 w-full rounded' />
          <Skeleton className='h-8 w-full rounded' />
        </div>
      </div>
    </div>
  );
}

export const FormSkeleton = () => (
  <div className='space-y-4 p-4'>
    <div className='space-y-2'>
      <Skeleton className='w-1/3 h-4' />
      <Skeleton className='w-full h-10' />
    </div>
    <div className='space-y-2'>
      <Skeleton className='w-1/3 h-4' />
      <Skeleton className='w-full h-10' />
    </div>
    <div className='space-y-2'>
      <Skeleton className='w-1/3 h-4' />
      <Skeleton className='w-full h-10' />
    </div>
    <div className='space-y-2'>
      <Skeleton className='w-1/3 h-4' />
      <Skeleton className='w-full h-10' />
    </div>
    <Skeleton className='w-1/4 h-10' />
  </div>
);
