import { useState } from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { dateTimeConfig } from '../interfaces';
import dayjs from 'dayjs';
import '../styles/datetime-picker.scss';

export function DateTimePicker({ message, onChangeDate, hasError }: any) {
  const [isDate, setIsDate] = useState<any>();

  return (
    <>
      <div className="datetime-picker-content" style={{ marginBottom: message ? '0px' : '20px' }}>
        <LocalizationProvider dateAdapter={AdapterDayjs} localeText={dateTimeConfig[navigator.language].locale}>
          <MobileDateTimePicker
            format={dateTimeConfig[navigator.language].format}
            disablePast
            minDate={dayjs().add(2, 'day')}
            minutesStep={5}
            maxDate={dayjs().add(6, 'months')}
            ampm={false}
            onChange={(value) => {
              setIsDate(value);
              onChangeDate({ date_in: dayjs(value).format('YYYY-MM-DD HH:mm') });
            }}
            slotProps={{
              textField: {
                value: isDate,
                error: hasError,
              },
            }}
          />
        </LocalizationProvider>
      </div>
      <div className={message ? 'content-input-message' : ''}>
        <span>{message}</span>
      </div>
    </>
  );
}
