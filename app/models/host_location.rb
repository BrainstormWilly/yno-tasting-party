class HostLocation < ApplicationRecord
  belongs_to :host
  belongs_to :location

  after_save :reset_primaries, if: :primary?
  after_destroy :set_new_primary, if: :primary?


  private

    def reset_primaries
      self.class.where(host_id: self.host_id).where.not(id: self.id).update_all(primary: false)
    end

    def set_new_primary
      first_hl = self.class.where(host_id: self.host_id).first
      first_hl.update!(primary: true) if first_hl
    end

end
