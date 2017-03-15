class Tab_Registery {

	constructor(){
		this.lookup = new Map();
	}

	add(id){
		if(!this.lookup.has(id)){
			this.lookup.set(id, id);

			return true;
		}

		return false;
	}

	remove(id){
		if(this.lookup.has(id)){
			this.lookup.delete(id);
		}
	}

	has(id){
		if(this.lookup.has(id)){
			return true;
		}

		return false;
	}

}