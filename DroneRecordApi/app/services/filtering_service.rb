module FilteringService
  class Base
    def initialize(records, params)
      @records = records
      @params = params
    end

    def filter
      raise NotImplementedError, 'Subclasses must implement a filter method'
    end

    protected

    def filter_by_uav_id(records)
      uav_id = @params[:uav_id]
      return records unless uav_id

      records.where(uav_id:)
    end
  end

  class WeekFilter < Base
    def filter
      start_date = Date.today.beginning_of_week(:sunday)
      end_date = Date.today.end_of_day
      filter_by_uav_id(@records).where(fecha_registro: start_date..end_date)
    end
  end

  class MonthFilter < Base
    def filter
      start_date = Date.today.beginning_of_month
      end_date = Date.today.end_of_day
      filter_by_uav_id(@records).where(fecha_registro: start_date..end_date)
    end
  end

  class DayFilter < Base
    def filter
      date = Date.parse(@params[:date])
      start_time = @params[:start_time] || '00:00'
      end_time = @params[:end_time] || '23:59'

      start_datetime = DateTime.parse("#{date} #{start_time}")
      end_datetime = DateTime.parse("#{date} #{end_time}")
      filter_by_uav_id(@records).where(fecha_registro: start_datetime..end_datetime)
    end
  end

  class CurrentFilter < Base
    def filter
      filter_by_uav_id(@records).order(fecha_registro: :desc).limit(5)
    end
  end

  class PersonalizedFilter < Base
    def filter
      start_date = Date.parse(@params[:start_date]).beginning_of_day
      end_date = Date.parse(@params[:end_date]).end_of_day
      filter_by_uav_id(@records).where(fecha_registro: start_date..end_date)
    end
  end
end
