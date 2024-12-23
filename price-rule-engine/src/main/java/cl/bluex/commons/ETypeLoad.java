package cl.bluex.commons;

public enum ETypeLoad {
	
	SOBRE		("Sobre","Sobre"),
	XS			("XS","Extra Small"),
	S			("S","Small"),
	M			("M","Medium"),
	XL			("XL","Extra Large"),
	XL50		("XL-50", "Extra Large 16-50"),
	XL50_PLUS	("XL>50", "Extra Large > 50"), 

	;

	String id;
	String description;

	ETypeLoad(String id) {
		this.id = id;
	}
	ETypeLoad(String id, String description) {
		this.id = id;
		this.description = description;
	}
	
	public static ETypeLoad get(String id){
		if(id != null && !id.isEmpty()) {
			for (ETypeLoad obj: ETypeLoad.values()){
				if (obj.getId().equalsIgnoreCase(id)){
					return obj;
				}
			}
		}
		return null;
	}

	public static boolean isXL50(String id){
		if(Util.isNullOrEmpty(id)){
			return false;
		}
		ETypeLoad type = get(id);
		if(Util.isNullOrEmpty(type)){
			return false;
		}
		return (ETypeLoad.XL50.equals(type) || ETypeLoad.XL50_PLUS.equals(type));
	}
	
	public String getId() {
		return id;
	}

	public String getDescription(){
		return description;
	}
	
}
