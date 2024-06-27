class FilteringContext
  def initialize(records, filter_type, params = {})
    @records = records
    @filter_type = filter_type
    @params = params
  end

  def filter
    strategy_class.new(@records, @params).filter
  end

  private

  def strategy_class
    case @filter_type
    when :week
      FilteringService::WeekFilter
    when :month
      FilteringService::MonthFilter
    when :day
      FilteringService::DayFilter
    when :current
      FilteringService::CurrentFilter
    when :personalized
      FilteringService::PersonalizedFilter
    else
      raise 'Unknown filter type'
    end
  end
end
