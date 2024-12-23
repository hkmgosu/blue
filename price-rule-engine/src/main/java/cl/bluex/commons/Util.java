package cl.bluex.commons;;

public class Util {
	
	public static boolean isNullOrEmpty(Object obj){
		return (obj==null);
	}
	
	public static boolean isNullOrEmpty(String obj){
		return (obj==null) || (obj.trim().length()==0);
	}
	
	public static boolean isNullOrEmpty(Integer obj) {
		return (obj==null);
	}

	//Retorna true si cualquiera de los objetos recibidos es null
	public static boolean hasNullOrEmpty(Object ...obj){
		if(obj != null) {
			for (Object object : obj) {
				if(!isNullOrEmpty(object)) {
					return false;
				};
			}
		}
		return true;
	}
	
}
