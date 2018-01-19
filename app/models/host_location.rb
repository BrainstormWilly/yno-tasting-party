class HostLocation < ApplicationRecord
  belongs_to :host
  belongs_to :location

  before_save :set_first_primary, unless: :primary?
  after_save :reset_primaries, if: :primary?
  after_destroy :set_new_primary, if: :primary?


  private

    def set_first_primary
      locations = self.class.where(host_id: self.host_id)
      self.primary = true if locations.count==0
    end

    def reset_primaries
      self.class.where(host_id: self.host_id).where.not(id: self.id).update_all(primary: false)
    end

    def set_new_primary
      first_hl = self.class.where(host_id: self.host_id).first
      first_hl.update!(primary: true) if first_hl
    end

end
