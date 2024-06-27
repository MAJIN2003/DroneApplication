class SolarPanelInfoService
  def initialize(date, start_time, end_time)
    @date = date
    @start_time = start_time
    @end_time = end_time
  end

  def call
    begin
      date = Date.parse(@date)
      start_datetime = DateTime.parse("#{date} #{@start_time}")
      end_datetime = DateTime.parse("#{date} #{@end_time}")
    rescue ArgumentError
      return { error: 'Invalid date or time format' }, :unprocessable_entity
    end

    SolarPanel.where(fecha_registro: start_datetime..end_datetime)
  end
end

