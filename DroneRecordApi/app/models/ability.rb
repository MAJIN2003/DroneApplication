# frozen_string_literal: true

class Ability
  include CanCan::Ability

  def initialize(user)
    can :manage, :all if user.admin?
    can %i[read], DatosUav if user.user?
    can %i[read], EstacionCargaAc if user.user?
    can %i[read], EstacionCargaDc if user.user?
    can %i[read], PanelSolar if user.user?
    can %i[read], Uav if user.user?
  end
end
