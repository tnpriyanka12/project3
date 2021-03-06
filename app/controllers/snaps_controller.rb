class SnapsController < ApplicationController
  before_action :set_snap, only: [:show, :edit, :update, :destroy]

  # GET /snaps
  # GET /snaps.json
  def index
    @snaps = Snap.all
  end

  # GET /snaps/1
  # GET /snaps/1.json
  def show
  end

  def home
    @snap = Snap.new
  end

  # GET /snaps/new
  def new
    @snap = Snap.new
  end

  # GET /snaps/1/edit
  def edit
  end

  # POST /snaps
  # POST /snaps.json
  def create

  snap = Snap.new(snap_params)
  if @current_user.present?
      if params[:snap].present?
        # Then call Cloudinary's upload method, passing in the file in params
        req = Cloudinary::Uploader.upload(params[:snap])
        snap.snap = req["public_id"]
      end
      respond_to do |format|
        if snap.save
          format.html { redirect_to snap, notice: 'Snap was successfully created.' }
          format.json { render json: snap, status: :ok }
        else
          format.html { render :new }
          format.json { render json: snap.errors, status: :unprocessable_entity }
        end
      end
    @current_user.snaps << snap
  else
    flash[:error] = "You must be logged in for this action."
    # format.html { redirect_to snap, notice: 'Snap was not created.' }
    # format.json { render json: snap, status: :ok }
    # binding.pry
  end # if current user present

  end

  # PATCH/PUT /snaps/1
  # PATCH/PUT /snaps/1.json
  def update
    user = @current_user
    # if params[:file].present?
    #   req = Cloudinary::Uploader.upload params[:file]
    #   user.profile_pic= req['public_id']
    # end
    user.update_attributes(snap_params)
    user.save
    redirect_to @current_user
  end

  # DELETE /snaps/1
  # DELETE /snaps/1.json
  def destroy
    @snap.destroy
    respond_to do |format|
      format.html { redirect_to snaps_url, notice: 'Snap was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_snap
      @snap = Snap.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def snap_params
      params.permit(:snap, :snap_name)
    end
end
