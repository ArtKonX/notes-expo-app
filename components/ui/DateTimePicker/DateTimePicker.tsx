import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

interface DateTimePickerProps {
    isDatePickerVisible: boolean,
    showDatePicker: () => void,
    selectedDate: Date,
    handleDatePick: (date: Date | undefined) => void
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
    isDatePickerVisible,
    showDatePicker,
    selectedDate,
    handleDatePick
}) => {

    return (
        <View>
            <TouchableOpacity className='bg-white max-w-[70%] p-2 rounded-[10px] flex items-center'
                onPress={showDatePicker}>
                <Text className='font-bold text-xl text-[#740001] mr-2.5'>
                    {selectedDate.toLocaleString()}
                </Text>
            </TouchableOpacity>

            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                date={selectedDate}
                onConfirm={handleDatePick}
                onCancel={showDatePicker}
                is24Hour={true}
                locale="ru_Ru"
                modalStyleIOS={{ marginBottom: 100 }}
            />
        </View>
    );
};

export default DateTimePicker;