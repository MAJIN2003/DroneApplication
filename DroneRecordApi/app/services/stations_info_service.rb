class StationsInfoService
    def initialize(records, start_time, end_time)
        @records = records
    end

    def call
        begin
            start_datetime = DateTime.parse("#{date} #{@start_time}")
            end_datetime = DateTime.parse("#{date} #{@end_time}")
        rescue ArgumentError
            return { error: 'Invalid date or time format' }, :unprocessable_entity
        end

        @records.where(fecha_registro: start_datetime..end_datetime)
    end
end