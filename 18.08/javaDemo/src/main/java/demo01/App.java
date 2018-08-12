package demo01;

/**
 * 1.定义字符串数组保存图书信息
 * 2. 提示用户输入，分别按“书名”和“图书序号”查找图书
 * 3. 根据输入信息进行适当的异常处理
 * a. 如果输入类型错误，抛出"错误命令异常"，并提示重新输入
 * b. 如果书名不存在，抛出图书不存在异常，并提示重新输入
 * c. 如果图书序号超过字符串数组范围，抛出“图书不存在异常”，并提示重新输入
 *
 */
public class App {
    String[] library = new String[5];
    public void App() {

    }
    public static void main( String[] args ) {
        System.out.println( "Hello World!" );
    }
}
