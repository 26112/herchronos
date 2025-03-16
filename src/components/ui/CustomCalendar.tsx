
import * as React from "react"
import { DayPicker } from "react-day-picker"
import { format, addDays, isWithinInterval, isSameDay } from "date-fns"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  periodDates?: Date[]
  ovulationDate?: Date
  fertileDays?: { from: Date, to: Date }
}

function CustomCalendar({
  className,
  classNames,
  showOutsideDays = true,
  periodDates = [],
  ovulationDate,
  fertileDays,
  ...props
}: CalendarProps) {
  const modifiers = {
    period: periodDates,
    ovulation: ovulationDate ? [ovulationDate] : [],
    fertile: fertileDays ? (date => 
      fertileDays && isWithinInterval(date, fertileDays) && 
      !isSameDay(date, ovulationDate || new Date())) : undefined,
  }

  const modifiersClassNames = {
    period: "bg-periodpal-pink text-periodpal-dark hover:bg-periodpal-pink/90",
    ovulation: "bg-periodpal-accent text-periodpal-dark hover:bg-periodpal-accent/90",
    fertile: "bg-periodpal-light text-periodpal-dark hover:bg-periodpal-light/90",
  }

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3 pointer-events-auto calendar-container", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: cn("relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent",
        ),
        day: cn(
          "h-8 w-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside: "text-muted-foreground opacity-50",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
      }}
      modifiers={modifiers}
      modifiersClassNames={modifiersClassNames}
      {...props}
    />
  )
}
CustomCalendar.displayName = "CustomCalendar"

export { CustomCalendar }
