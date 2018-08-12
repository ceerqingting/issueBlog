package demo01;

public class ThrowError {
    public void divide(int one, int two) throws Exception {
        if (two == 0){
            throw new Exception("两数相除，除数不能为0");
        } else {
            System.out.println("两数相除，结果为：" + one/two);
        }
    }
    public static void main(String[] args) throws Exception {
        ThrowError te = new ThrowError();
        te.divide(1,0);
    }
}
