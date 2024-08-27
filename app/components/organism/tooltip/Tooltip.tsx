import {
  TooltipContent,
  Tooltip,
  TooltipTrigger,
  TooltipProvider,
} from "../../ui/tooltip";

interface TooltipProps {
  title: string;
  desc: string;
}
export default function Tooltips({ title, desc }: TooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger className='text-start'>{title}</TooltipTrigger>
        <TooltipContent>
          <p>{desc}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
